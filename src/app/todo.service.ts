import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { map, scan, take, startWith, publishReplay, refCount } from 'rxjs/operators';
import { Todo } from './todo';
import { StorageService } from './storage.service';

let lastId = 0;
type TodosProcess = (todos: Todo[]) => Todo[];
@Injectable()
export class TodoService
{
  todos$: Observable<Todo[]>;
  private resetter$ = new BehaviorSubject<TodosProcess>( ( todos: Todo[] ) => todos );
  private create$ = new Subject<Todo>();
  private update$ = new Subject<Partial<Todo>>();
  private remove$ = new Subject<Partial<Todo>>();
  private get$ = new Subject<Partial<Todo>>();
  constructor( readonly storage: StorageService )
  {
    /**
     * @summary RxJS - Subject, pipes operators usage
     */
    this.todos$ = this.resetter$.pipe
    (
      startWith( () =>
      {
        const items: Array<{ id: number }> = storage.getItems() || [];
        // update lastId
        lastId = items.reduce( ( max, item ) => item.id > max ? item.id : max, 0 );
        return items;
      } ),
      scan( ( todos: Todo[], process: TodosProcess ) => process( todos ), [] ),
      /**
       * @summary RxJS - Multicasting - why not shareReplay()?
       */
      publishReplay(1),
      refCount(),
    );
    // define add process
    this.create$.pipe
    (
      map( (todo: Todo): TodosProcess => ( todos: Todo[] ) => storage.setItems([ ...todos, todo ]) ),
    ).subscribe( this.resetter$ );
    // define update process
    this.update$.pipe
    (
      map( ( todo: Todo ): TodosProcess => ( todos: Todo[] ) => ( Object.assign( todos.find( t => t.id === todo.id ), todo ), storage.setItems(todos) ) )
    ).subscribe( this.resetter$ );
    // define remove process
    this.remove$.pipe
    (
      map( ( todo: Todo ): TodosProcess => ( todos: Todo[] ) => storage.setItems( todos.filter( t => todo.id !== t.id ) ) )
    ).subscribe( this.resetter$ );
    this.get$.pipe
    (
      map( ( todo: Todo ): TodosProcess => ( todos: Todo[] ) => todos.find( t => t.id === todo.id ) as unknown as Todo[] )
    ).subscribe( this.resetter$ );
  }
  // expose create method
  createTodo( todo: Todo )
  {
    if ( !todo.id ) todo.id = ++lastId;
    return this.create$.next( todo );
  }
  // expose update method
  updateTodo( todo: Partial<Todo> )
  {
    if ( !todo.id ) return;
    return this.update$.next( todo );
  }
  // expose remove method
  removeTodo( todo: Partial<Todo> )
  {
    if ( !todo.id ) return;
    return this.remove$.next( todo );
  }
  getTodoById( id: number )
  {
    return this.todos$.pipe
    (
      take(1),
      map( todos => todos.find( todo => todo.id === id ) )
    );
  }
}
