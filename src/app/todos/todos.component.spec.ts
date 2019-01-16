import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { TodosComponent } from './todos.component';
import { AppMaterialModule } from '../app-material.module';
import { TodoService } from '../todo.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TodosComponent', () =>
{
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach( async(() =>
  {
    TestBed.configureTestingModule
    ({
      declarations: [ TodosComponent ],
      providers: [ TodoService ],
      imports: [ FormsModule, AppMaterialModule, RouterTestingModule, NoopAnimationsModule ]
    })
    .compileComponents();
  }) );

  beforeEach(() =>
  {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy() );

  it('should render 2 article elements for Todos screen', () =>
  {
    const fixture = TestBed.createComponent(TodosComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    /**
     * @summary testing - component template
     */
    expect(compiled.querySelectorAll('article').length).toBe(2);
  });
});
