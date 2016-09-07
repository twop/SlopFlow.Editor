import {ICommand} from "./command"

import {Node} from "../Model/node"
import {Port} from "../Model/port"
import {Logger} from "../Model/logger"
import {Scene} from "../Model/scene"


export class NewPortCommand implements ICommand
{
  constructor(private port:Port, private isInput:boolean) 
  {
    
  }

  Execute(scene:Scene, logger:Logger):void
  {
    if (!scene.selectedNode)
      throw "scene.selectedNode is null";
      
      this.getPorts(scene.selectedNode).push(this.port);
      logger.debug('execute NewPortCommand portName = ' + this.port.name);
  }

  Revert(scene:Scene, logger:Logger):void
  {
  }

  private getPorts(node:Node):Port[] 
  {
     return this.isInput ? node.inputs: node.outputs;
  }
}