import {ISceneCommand} from "./sceneCommand"

import {Node} from "../../Model/node"
import {Log} from "../../LogComponent/log"
import {Scene} from "../scene"
import {NodeModel} from "../../Forms/nodeModel"

export class NewNodeCommand implements ISceneCommand
{
  constructor(private nodeModel: NodeModel) 
  {
  }

  Execute(scene: Scene, logger: Log): void
  {
    var newNode = new Node(this.nodeModel.name);
    scene.addNewNode(newNode);

    logger.debug(`added node: ${this.nodeModel.name}`);
  }
}