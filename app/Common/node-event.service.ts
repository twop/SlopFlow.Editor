import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class NodeEventService 
{
  requestNewNode = new EventEmitter<string>();
  requestNewPort = new EventEmitter<string>();
}