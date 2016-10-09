import {NodeWorkspace} from '../Scene/nodeWorkspace';
import {NodePort} from '../Model/node';

export class NewPortRequest
{
  constructor(public name:string, public workspace:NodeWorkspace) {}
}

export class EditPortRequest
{
  constructor(public port:NodePort, public workspace:NodeWorkspace) {}
}
