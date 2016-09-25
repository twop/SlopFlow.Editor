import {Injectable, EventEmitter} from '@angular/core';
import {NewPortRequest} from './newPortEvent';

@Injectable()
export class NodeEventService 
{
  requestNewNode = new EventEmitter<string>();
  requestNewPort = new EventEmitter<NewPortRequest>();
}