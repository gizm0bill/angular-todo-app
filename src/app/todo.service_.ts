import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, BehaviorSubject } from 'rxjs';
import { filter, map, scan, shareReplay, tap, switchMapTo, isEmpty, defaultIfEmpty, startWith, skip } from 'rxjs/operators';
import { Todo } from './todo';

let lastId = 0;
@Injectable({ providedIn: 'root' })
export class TodoService
{
  private deletedTodos = new Set;
  private todoUpdates = new Map;
  private resetter = new BehaviorSubject<boolean>(true);
  private _todos: ReplaySubject<Todo> = new ReplaySubject;
  constructor() { }
  get todos(): Observable<Todo[]>
  {
    return this.resetter.asObservable().pipe
    (
      switchMapTo( this._todos.asObservable().pipe
      (
        startWith( new Todo({ id: undefined, name: '' }) ),
        filter( todo => !this.deletedTodos.has( todo.id ) ),
        map( todo => this.todoUpdates.has( todo.id ) ? Object.assign( todo, this.todoUpdates.get( todo.id ) ) : todo ),
        scan( ( todos: Todo[], todo: Todo ) => todo.id !== undefined ? [ ...todos, todo ] : [], [] ),
        tap( console.log.bind( undefined, 'getting todos') ),
      ) ),
      shareReplay()
      
    );
  }
  addTodo( todo: Todo ): TodoService
  {
    if ( !todo.id )  todo.id = ++lastId;
    this._todos.next( todo );
    return this;
  }
  removeTodo( todo: Todo ): TodoService
  {
    if ( !todo.id ) return this;
    return this.removeTodoById( todo.id );
  }
  removeTodoById( id: number ): TodoService
  {
    this.deletedTodos.add( id );
    this.resetter.next(true);
    return this;
  }
  updateTodo( todo: Todo, props: Todo ): TodoService
  {
    if ( !todo.id ) return this;
    return this.updateTodoById( todo.id, props );
  }
  updateTodoById( id: number, props: Todo )
  {
    this.todoUpdates.set( id, props );
    this.resetter.next(true);
    return this;
  }
}
