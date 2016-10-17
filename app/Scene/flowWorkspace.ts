import {Log} from '../LogComponent/log'
import {Workspace} from './workspace';
import {Flow} from '../Model/flow';

export class FlowWorkspace extends Workspace
{
  constructor(public flow: Flow, log: Log)
  {
    super(log);
  }

  public get name(): string
  {
    return this.flow.name;
  }
}