import {Injectable, EventEmitter} from '@angular/core';
import {NewPortRequest, EditPortRequest} from './portEvents';
import {Node} from '../Model/node';
import {NodeWorkspace} from '../Scene/nodeWorkspace';

@Injectable()
export class NodeEventService 
{
  requestNewNode = new EventEmitter<string>();
  requestEditNode = new EventEmitter<NodeWorkspace>();
  requestNewPort = new EventEmitter<NewPortRequest>();
  requestEditPort = new EventEmitter<EditPortRequest>();
}