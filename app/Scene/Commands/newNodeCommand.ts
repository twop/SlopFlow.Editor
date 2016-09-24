import {ICommand} from "./command"

import {Node} from "../node"
import {Log} from "../../LogComponent/log"
import {Scene} from "../scene"
import {NodeModel} from "../../Forms/node-model"

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