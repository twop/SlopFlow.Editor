import {Injectable, EventEmitter} from '@angular/core';
import {NewPortRequest, EditPortRequest} from './portEvents';
import {Node} from '../Scene/node';
import {Workspace} from '../Scene/workspace';

@Injectable()
export class NodeEventService 
{
  requestNewNode = new EventEmitter<string>();
  requestEditNode = new EventEmitter<Workspace>();
  requestNewPort = new EventEmitter<NewPortRequest>();
  requestEditPort = new EventEmitter<EditPortRequest>();
}