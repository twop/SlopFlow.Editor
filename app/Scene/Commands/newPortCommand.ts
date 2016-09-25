import {ICommand} from "./command"

import {Port} from "../port"
import {Log} from "../../LogComponent/log"
import {Scene} from "../scene"


export class NewPortCommand implements ICommand
{
  constructor(private port: Port, private isInput: boolean) 
  {
  }

  Execute(scene: Scene, logger: Log): void
  {
    if (!scene.activeWorkspace)
      throw "scene.activeWorkspace is null";

    scene.addPortToNode( scene.activeWorkspace.node, this.port, this.isInput );
    logger.debug('execute NewPortCommand portName = ' + this.port.name);
  }

  Revert(scene: Scene, logger: Log): void
  {
  }
}