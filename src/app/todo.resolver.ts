import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TodoService } from './todo.service';
import { Todo } from './todo';

@Injectable()
export class TodoResolver implements Resolve<Observable<Todo>>
{
  constructor( private todoService: TodoService ) {}

  /**
   * @summary route data resolver - definition
   */
  resolve( route: ActivatedRouteSnapshot )
  {
    return this.todoService.getTodoById( +route.params.id );
  }
}
