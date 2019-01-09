import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Todo } from './todo';
import { TodoService } from './todo.service';
import { find, take, tap, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TodoResolver implements Resolve<Observable<Todo[]>>
{
  constructor( private todoService: TodoService ) {}
  
  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot )
  {
  }
}