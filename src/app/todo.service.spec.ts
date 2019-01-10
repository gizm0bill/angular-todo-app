import { TestBed, inject } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { Todo } from './todo';

describe('TodoDataService', () =>
{
  beforeEach( () => TestBed.configureTestingModule
  ({
    providers: [TodoService]
  }) );

  it( 'should be created', inject( [TodoService], ( service: TodoService ) => expect(service).toBeTruthy() ) );

  describe('#save(todo)', () =>
  {
    it('should automatically assign an incrementing id', inject([TodoService], (service: TodoService) =>
    {
      const
        todo1 = new Todo({ name: 'Buy milk', complete: false }),
        todo2 = new Todo({ name: 'Make dog bark', complete: true });
      service.createTodo( todo1 );
      service.createTodo( todo2 );
      service.todos.subscribe( _ => console.log(_) );

      service.todos.subscribe( _ => console.log(_) );
      // expect(service.getTodoById(1)).toEqual(todo1);
      // expect(service.getTodoById(2)).toEqual(todo2);
    }));
  });
});
