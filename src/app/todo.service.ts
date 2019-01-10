import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, BehaviorSubject, Subject } from 'rxjs';
import { filter, map, scan, shareReplay, switchMapTo, startWith, tap, take } from 'rxjs/operators';
import { Todo } from './todo';

type TodosProcess = (todos: Todo[]) => Todo[];

let lastId = 0;
@Injectable({ providedIn: 'root' })
export class TodoService
{
  todos$: Observable<Todo[]>;
  private resetter$ = new BehaviorSubject<TodosProcess>( ( todos: Todo[] ) => todos );
  private create$ = new Subject<Todo>();
  private update$ = new Subject<Partial<Todo>>();
  private remove$ = new Subject<Partial<Todo>>();
  private get$ = new Subject<Partial<Todo>>();

  todo$: Observable<Todo>;
  private x: any;
  constructor()
  {
    this.x = this.resetter$.pipe
    (
      tap( _ => { debugger; } ),
      scan( ( todos: Todo[], process: TodosProcess ) => process( todos ), [] ),
      tap( _ => { debugger; } ),
    );
    this.todos$ = this.x.pipe( shareReplay() );

    // define add process
    this.create$.pipe
    (
      map( (todo: Todo): TodosProcess => ( todos: Todo[] ) => [ ...todos, todo ] )
    ).subscribe( this.resetter$ );
    // define update process
    this.update$.pipe
    (
      map( ( todo: Todo ): TodosProcess => ( todos: Todo[] ) => ( Object.assign( todos.find( t => t.id === todo.id ), todo ), todos ) )
    ).subscribe( this.resetter$ );
    // define remove process
    this.remove$.pipe
    (
      map( ( todo: Todo ): TodosProcess => ( todos: Todo[] ) => todos.filter( t => todo.id !== t.id ) )
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
    this.get$.next( { id } );
    return this.resetter$.pipe( take(1), tap( _ => { debugger; } ) );
  }
}
