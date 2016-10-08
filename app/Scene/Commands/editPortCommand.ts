import {Port} from "../../Model/port"
import {Log} from "../../LogComponent/log"
import {IWorkSpaceCommand} from './workspaceCommand';
import {Workspace} from '../workspace';
import {PortModel} from '../../Forms/portModel';

export class EditPortCommand implements IWorkSpaceCommand
{
  private oldPortModel:PortModel = null;
  constructor(private port: Port, private newPortModel: PortModel)
  {
    this.oldPortModel = new PortModel(port.name, port.dataType, true, port.isInput);
  }

  Execute(workspace: Workspace, logger: Log): void
  {
    if (!workspace)
      throw `workspace is null`;

    workspace.editPort( this.port, this.newPortModel);
    logger.debug(`changed port ${this.port.name} in ${workspace.name} to ${this.newPortModel.toString()}`);
  }

  Revert(workspace: Workspace, logger: Log): void
  {
    if (!workspace)
      throw `workspace is null`;

    workspace.editPort( this.port, this.oldPortModel);
    logger.debug(`changed back port ${this.port.name} in ${workspace.name} to ${this.oldPortModel.toString()}`);
  }
}
