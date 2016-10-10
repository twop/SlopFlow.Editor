import {NodeWorkspace} from '../Scene/nodeWorkspace';
import {NodePort} from '../Model/node';

export class NewPortRequest
{
  constructor(public name:string, public nodeWorkspace:NodeWorkspace) {}
}

export class EditPortRequest
{
  constructor(public port:NodePort, public nodeWorkspace:NodeWorkspace) {}
}
