import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, fromEvent, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import { Router } from '@angular/router';
// import { BROWSER_STORAGE, StorageService } from '../storage.service';

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
  /**
   * @summary injection - example of InjectionToken override in component
   */
  // providers: [ TodoService, StorageService, { provide: BROWSER_STORAGE, useFactory: () => sessionStorage } ]
})
export class TodosComponent
{
  todoModel = new Todo;
  todos$: Observable<Todo[]>;
  stats: { total: number, complete: number };
  constructor( private todoService: TodoService, public router: Router )
  {
    this.todos$ = this.todoService.todos$.pipe
    (
      tap( todos =>
        this.stats = todos.reduce( ( stats, todo ) => ( stats.complete += +todo.complete, stats.total += 1, stats ) , { total: 0, complete: 0 } )
    ) );
  }
  
  @ViewChild('todoForm') todoForm: NgForm;
  uploaded$: Observable<string>;
  upload( event: Event )
  {
    const file = (event.target as HTMLInputElement).files.item(0);
    /**
     * @summary file uploads - example of uploaded file manipulation
     */
    const reader = new FileReader;
    this.uploaded$ = fromEvent( reader, 'loadend' ).pipe( map( _ =>
    {
      const fileData = reader.result.toString();
      const [ , type ] = fileData.split(';').reduce( ( acc, val, idx ) => [ ...acc, ...( !idx ? val.split(':') : [val] ) ], [] );
      if ( !Object.values(IMAGE_MIME_TYPES).includes(type) ) return;
      // …file manipulation…
      this.todoModel.image = fileData;
      return file.name;
    } ) );
    reader.readAsDataURL( file );
  }
  addTodo()
  {
    if ( !this.todoModel.name ) return;
    /**
     * @todo save after upload
     */
    this.todoService.createTodo( this.todoModel );
    this.todoModel = new Todo;
    this.uploaded$ = of('');
    this.todoForm.resetForm();
  }
  updateTodo( props: Partial<Todo> ) { return this.todoService.updateTodo( props ); }
  removeTodo( todo: Partial<Todo> ) { return this.todoService.removeTodo( todo ); }
  
  showAdd = true;
  popupActive: boolean;
  closePopup() { this.router.navigateByUrl('/todos'); }
}
