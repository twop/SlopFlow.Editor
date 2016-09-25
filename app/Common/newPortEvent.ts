import {Workspace} from '../Scene/workspace';

export class NewPortRequest
{
  constructor(public name:string, public workspace:Workspace) {}
}
