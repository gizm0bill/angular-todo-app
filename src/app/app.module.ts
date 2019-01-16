import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { AppMaterialModule } from './app-material.module';
import { TodoComponent } from './todo/todo.component';
import { TodoService } from './todo.service';
import { StorageService, BROWSER_STORAGE } from './storage.service';

@NgModule
({
  declarations:
  [
    AppComponent,
    TodosComponent,
    TodoComponent
  ],
  imports:
  [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppMaterialModule,
    AppRoutingModule
  ],
  providers:
  [
    TodoService,
    StorageService,
    /**
     * @summary injection token - example of InjectionToken override in module
     */
    // { provide: BROWSER_STORAGE, useFactory: () => sessionStorage }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
