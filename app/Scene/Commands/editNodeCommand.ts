import {ISceneCommand} from "./sceneCommand"

import {Node} from "../../Model/node"
import {Log} from "../../LogComponent/log"
import {Scene} from "../scene"
import {NodeModel} from "../../Forms/nodeModel"
import {Workspace} from '../workspace';

export class EditNodeCommand implements ISceneCommand
{
  constructor(private workspace:Workspace, private nodeModel: NodeModel)
  {}

  Execute(scene: Scene, logger: Log): void
  {
    var oldName = this.workspace.name;
    scene.renameNodeInWorkspace(this.workspace, this.nodeModel.name);

    logger.debug(`renamed node ${oldName} to ${this.nodeModel.name}`);
  }
}