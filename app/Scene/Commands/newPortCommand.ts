import {NodePort} from "../../Model/node"
import {Log} from "../../LogComponent/log"
import {IWorkSpaceCommand} from './workspaceCommand';
import {NodeWorkspace} from '../nodeWorkspace';
import {Workspace} from '../workspace';


export class NewPortCommand implements IWorkSpaceCommand
{
  constructor(private port: NodePort)
  {
  }

  Execute(workspace: Workspace, logger: Log): void
  {
    if (!workspace || !(workspace instanceof NodeWorkspace))
      throw `workspace is null or wrong type`;

    workspace.addPort( this.port );
    logger.debug(`added port ${this.port.name} in ${workspace.name}`);
  }

  Revert(workspace: Workspace, logger: Log): void
  {
    if (!workspace || !(workspace instanceof NodeWorkspace))
      throw `workspace is null or wrong type`;

    workspace.removePort( this.port);
    logger.debug(`removed port ${this.port.name} in ${workspace.name}`);
  }
}