import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { TodoComponent } from './todo/todo.component';
import { TodoResolver } from './todo.resolver';

const routes: Routes =
[
  {
    path: '',
    redirectTo: 'todos',
    pathMatch: 'full'
  },
  {
    path: 'todos',
    component: TodosComponent,
    children:
    [
      {
        path: ':id',
        component: TodoComponent,
        /**
         * @summary route data resolver - usage
         */
        resolve: { todo: TodoResolver },
        outlet: 'popup',
      }
    ]
  },
];

@NgModule
({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [ TodoResolver ]
})
export class AppRoutingModule { }
