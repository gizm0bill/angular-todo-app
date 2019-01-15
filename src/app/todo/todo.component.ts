import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../todo';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'article.todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent
{
  todo$: Observable<Todo>;
  constructor( route: ActivatedRoute, sanitizer: DomSanitizer )
  {
    this.todo$ = route.data.pipe
    (
      map( ({ todo }): Todo => ( todo.image = todo.image ? sanitizer.bypassSecurityTrustStyle(`url(${todo.image})`) : null, todo ) ),
    );
  }
}
