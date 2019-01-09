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
  providers: [TodoService],
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
    // this.todoService.addTodo( new Todo({ name: 'amet' }) );
    
    this.todos$ = this.todoService.todos;
  }
  
  @ViewChild('todoForm') todoForm: NgForm;
  addTodo()
  {
    if ( !this.todoModel.name ) return;
    this.todoService.addTodo( this.todoModel );
    this.todoModel = new Todo;
    this.todoForm.resetForm();
  }
  updateTodo( id: number, props: Todo ) { return this.todoService.updateTodoById( id, props ); }
  removeTodo( id: number ) { return this.todoService.removeTodoById(id); }
  upload() {

  }
}
