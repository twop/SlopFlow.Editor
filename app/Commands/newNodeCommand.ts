import {ICommand} from "./command"

import {Node} from "../Model/node"
import {Port} from "../Model/port"
import {Log} from "../Model/log"
import {Scene} from "../Model/scene"
import {NodeModel} from "../Forms/node-model"

export class NewNodeCommand implements ICommand
{
  constructor(private nodeModel: NodeModel) 
  {

  }

  Execute(scene: Scene, logger: Log): void
  {
    var newNode = new Node(this.nodeModel.name);
    scene.addNewNode(newNode);

    logger.debug("execute NewNodeCommand name = " + this.nodeModel.name);
  }

  Revert(scene: Scene, logger: Log): void
  {

  }
}