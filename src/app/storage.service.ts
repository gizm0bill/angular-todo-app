import { Inject, Injectable, InjectionToken } from '@angular/core';
 
export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage',
{
  providedIn: 'root',
  factory: () => localStorage
});

@Injectable()
export class StorageService
{
  /**
   * 
   * @summary injection token - example of InjectionToken usage
   */
  constructor( @Inject( BROWSER_STORAGE ) private readonly storage: Storage ) {}

  setItems( values: any[] ) { return this.storage.setItem( 'my-todos', JSON.stringify(values) ), values; }
  getItems( ) { return JSON.parse( this.storage.getItem( 'my-todos' ) ); }
}
