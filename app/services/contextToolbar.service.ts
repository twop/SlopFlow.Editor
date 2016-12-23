import {Injectable, EventEmitter} from '@angular/core';
import {Toolbar} from './toolbar';

@Injectable()
export class ContextToolbarService
{
  newToolbarEvent = new EventEmitter<Toolbar>();
}
