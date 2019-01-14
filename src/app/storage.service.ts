import { Injectable } from "@angular/core";

@Injectable()
export class StorageService
{
  setItems( values: any[] ) { return localStorage.setItem( 'my-todos', JSON.stringify(values) ), values; }
  getItems( ) { return JSON.parse( localStorage.getItem( 'my-todos' ) ); }
}
