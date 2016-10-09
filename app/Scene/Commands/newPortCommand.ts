import {NodePort} from "../../Model/node"
import {Log} from "../../LogComponent/log"
import {IWorkSpaceCommand} from './workspaceCommand';
import {NodeWorkspace} from '../nodeWorkspace';


export class NewPortCommand implements IWorkSpaceCommand
{
  constructor(private port: NodePort)
  {
  }

  Execute(workspace: NodeWorkspace, logger: Log): void
  {
    if (!workspace)
      throw `workspace is null`;

    workspace.addPort( this.port );
    logger.debug(`added port ${this.port.name} in ${workspace.name}`);
  }

  Revert(workspace: NodeWorkspace, logger: Log): void
  {
    if (!workspace)
      throw `workspace is null`;

    workspace.removePort( this.port);
    logger.debug(`removed port ${this.port.name} in ${workspace.name}`);
  }
}