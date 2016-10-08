import {Workspace} from '../Scene/workspace';
import {Port} from '../Model/port';

export class NewPortRequest
{
  constructor(public name:string, public workspace:Workspace) {}
}

export class EditPortRequest
{
  constructor(public port:Port, public workspace:Workspace) {}
}
