import {ICommand} from "./command"

import {Node} from "../Model/node"
import {Port} from "../Model/port"
import {Logger} from "../Model/logger"
import {Scene} from "../Model/scene"
import {NodeModel} from "../Forms/node-model"

export class NewNodeCommand implements ICommand
{
  constructor(private nodeModel: NodeModel) 
  {

  }

  Execute(scene: Scene, logger: Logger): void
  {
    var newNode = new Node(this.nodeModel.name);
    scene.nodes.push(newNode);
    scene.selectNode(newNode);

    logger.debug("execute NewNodeCommand name = " + this.nodeModel.name);
  }

  Revert(scene: Scene, logger: Logger): void
  {

  }
}