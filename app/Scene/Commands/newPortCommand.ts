import {Port} from "../../Model/port"
import {Log} from "../../LogComponent/log"
import {IWorkSpaceCommand} from './workspaceCommand';
import {Workspace} from '../workspace';


export class NewPortCommand implements IWorkSpaceCommand
{
  constructor(private port: Port)
  {
  }

  Execute(workspace: Workspace, logger: Log): void
  {
    if (!workspace)
      throw `workspace is null`;

    workspace.addPort( this.port );
    logger.debug(`added port ${this.port.name} in ${workspace.name}`);
  }

  Revert(workspace: Workspace, logger: Log): void
  {
    if (!workspace)
      throw `workspace is null`;

    workspace.removePort( this.port);
    logger.debug(`removed port ${this.port.name} in ${workspace.name}`);
  }
}