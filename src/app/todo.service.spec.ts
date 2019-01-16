import { TestBed, inject } from '@angular/core/testing';
import { TodoService } from './todo.service';
import { Todo } from './todo';
import { BROWSER_STORAGE } from './storage.service';

/**
 * @summary testing - Mocking services
 */
class fakeStorage implements Storage
{
  private store: Map<string, any> = new Map;
  get length(): number { return this.store.size; };
  clear(): void { this.store.clear(); };
  getItem( key: string ): string | null { return this.store.get( key ) || null; };
  key( index: number ): string | null { return Array.from( this.store.keys() )[ index ]; };
  removeItem( key: string ): void { this.store.delete( key ); };
  setItem( key: string, value: string): void { this.store.set( key, value ); };
}

describe('TodoDataService', () =>
{
  beforeEach( () => TestBed.configureTestingModule
  ({
    providers:
    [
      TodoService,
      { provide: BROWSER_STORAGE, useFactory: () => new fakeStorage }
    ]
  }) );

  it( 'should be created', inject( [TodoService], ( service: TodoService ) => expect(service).toBeTruthy() ) );

  describe('#operation(todo)', () =>
  {
    it('should automatically create and assign an id',
      ( done: DoneFn ) =>
        /**
         * @summary testing - injecting services
         */
        inject( [ TodoService ], ( service: TodoService ) =>
        {
          service.createTodo( new Todo({ name: 'Make dog bark', complete: true }) );
          service.todos$.subscribe( todos =>
          {
            expect( todos.find( todo => !!todo.id ) ).not.toBeNull();
            /**
             * @summary testing - RxJS with DoneFn
             */
            done();
          });
        })()
    );

    it('should update properties',
      ( done: DoneFn ) => inject( [ TodoService ], ( service: TodoService ) =>
      {
        const description = 'Love cat';
        service.todos$.subscribe();
        service.createTodo( new Todo({ name: 'Adopt cat', complete: true }) );
        service.updateTodo( { id: 1, description } );
        service.todos$.subscribe( todos =>
        {
          expect( todos.pop().description ).toBe( description );
          done();
        });
      })()
    )
  });
});
