import {Port} from "../port"
import {Log} from "../../LogComponent/log"
import {IWorkSpaceCommand} from './workspaceCommand';
import {Workspace} from '../workspace';


export class NewPortCommand implements IWorkSpaceCommand
{
  constructor(private port: Port, private isInput: boolean)
  {
  }

  Execute(workspace: Workspace, logger: Log): void
  {
    if (!workspace)
      throw `workspace is null`;

    workspace.addPort( this.port, this.isInput );
    logger.debug(`added port ${this.port.name} in ${workspace.name}`);
  }

  Revert(workspace: Workspace, logger: Log): void
  {
    if (!workspace)
      throw `workspace is null`;

    workspace.removePort( this.port, this.isInput );
    logger.debug(`removed port ${this.port.name} in ${workspace.name}`);
  }
}