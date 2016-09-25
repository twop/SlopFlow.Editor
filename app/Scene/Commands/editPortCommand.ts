import {Port} from "../port"
import {Log} from "../../LogComponent/log"
import {IWorkSpaceCommand} from './workspaceCommand';
import {Workspace} from '../workspace';


export class EditPortCommand implements IWorkSpaceCommand
{
  private oldName:string = null;
  constructor(private port: Port, private newName:string)
  {
    this.oldName = port.name;
  }

  Execute(workspace: Workspace, logger: Log): void
  {
    if (!workspace)
      throw `workspace is null`;

    workspace.renamePort( this.port, this.newName);
    logger.debug(`renamed port ${this.port.name} in ${workspace.name} to ${this.newName} `);
  }

  Revert(workspace: Workspace, logger: Log): void
  {
    if (!workspace)
      throw `workspace is null`;

    workspace.renamePort( this.port, this.oldName);
    logger.debug(`renamed back port ${this.port.name} in ${workspace.name} to ${this.oldName} `);
  }
}
