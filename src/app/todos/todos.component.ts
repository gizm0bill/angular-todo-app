import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';

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
    // this.todoService.addTodo( new Todo({ name: 'lorem', complete: true }) );
    // this.todoService.addTodo( new Todo({ name: 'ipsum' }) );
    // this.todoService.addTodo( new Todo({ name: 'dolor' }) );
    // this.todoService.addTodo( new Todo({ name: 'sit' }) );
    this.todoService.createTodo( new Todo({ name: 'amet' }) );
    
    this.todos$ = this.todoService.todos$;
  }
  
  @ViewChild('todoForm') todoForm: NgForm;
  upload()
  {

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
}
