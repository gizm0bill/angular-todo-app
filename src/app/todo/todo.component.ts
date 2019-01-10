import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'article.todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent
{
  todo$: Observable<Todo>;
  constructor( route: ActivatedRoute )
  {
    this.todo$ = route.data.pipe( map( ({ todo }) => todo ) );
  }
}
