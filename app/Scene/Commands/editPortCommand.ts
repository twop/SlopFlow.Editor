import {NodePort} from "../../Model/node"
import {Log} from "../../LogComponent/log"
import {IWorkSpaceCommand} from './workspaceCommand';
import {NodeWorkspace} from '../nodeWorkspace';
import {PortModel} from '../../Forms/portModel';

export class EditPortCommand implements IWorkSpaceCommand
{
  private oldPortModel:PortModel = null;
  constructor(private port: NodePort, private newPortModel: PortModel)
  {
    this.oldPortModel = new PortModel(port.name, port.dataType, true, port.isInput);
  }

  Execute(workspace: NodeWorkspace, logger: Log): void
  {
    if (!workspace)
      throw `workspace is null`;

    workspace.editPort( this.port, this.newPortModel);
    logger.debug(`changed port ${this.port.name} in ${workspace.name} to ${this.newPortModel.toString()}`);
  }

  Revert(workspace: NodeWorkspace, logger: Log): void
  {
    if (!workspace)
      throw `workspace is null`;

    workspace.editPort( this.port, this.oldPortModel);
    logger.debug(`changed back port ${this.port.name} in ${workspace.name} to ${this.oldPortModel.toString()}`);
  }
}
