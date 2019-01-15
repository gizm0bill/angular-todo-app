import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';

enum IMAGE_MIME_TYPES
{
  SVG = 'image/svg+xml',
  BMP = 'image/bmp',
  JPG = 'image/jpeg',
  PNG = 'image/png',
  GIF = 'image/gif',
};

@Component
({
  selector: 'section.todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent
{
  todoModel = new Todo;
  todos$: Observable<Todo[]>;
  constructor( private todoService: TodoService )
  {
    this.todos$ = this.todoService.todos$;
  }
  
  @ViewChild('todoForm') todoForm: NgForm;
  uploaded$: Observable<string>;
  upload( event: Event )
  {
    const file = (event.target as HTMLInputElement).files.item(0);
    /**
     * @summary example of uploaded file manipulation
     */
    const reader = new FileReader;
    this.uploaded$ = fromEvent( reader, 'loadend' ).pipe( map( _ =>
    {
      const [ , type ] = reader.result.toString().split(';').reduce( ( acc, val, idx ) => [ ...acc, ...( !idx ? val.split(':') : [val] ) ], [] );
      if ( !Object.values(IMAGE_MIME_TYPES).includes(type) ) return;
      // …file manipulation…
      return file.name;
    } ) );
    reader.readAsDataURL( file );
  }
  addTodo()
  {
    if ( !this.todoModel.name ) return;
    this.todoService.createTodo( this.todoModel );
    this.todoModel = new Todo;
    this.todoForm.resetForm();
  }
  updateTodo( props: Partial<Todo> ) { return this.todoService.updateTodo( props ); }
  removeTodo( todo: Partial<Todo> ) { return this.todoService.removeTodo( todo ); }
  
  popupActive: boolean;
}
