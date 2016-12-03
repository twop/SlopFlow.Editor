import {ISceneCommand} from "./sceneCommand"

import {Log} from "../../LogComponent/log"
import {Scene} from "../scene"
import {Flow} from '../../Model/flow';

export class NewFlowCommand implements ISceneCommand
{
  constructor(private flowName:string)
  {}

  Execute(scene: Scene, logger: Log): void
  {
    const flow = new Flow(this.flowName);
    scene.addNewFlow(flow);

    logger.debug(`added flow: ${this.flowName}`);
  }
}