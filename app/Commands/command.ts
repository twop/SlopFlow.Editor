import {Log} from "../Model/log"
import {Scene} from "../Model/scene"

export interface ICommand
{
  Execute(scene: Scene, logger: Log): void;
  Revert(scene: Scene, logger: Log): void;
}