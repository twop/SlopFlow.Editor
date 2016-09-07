import {Logger} from "../Model/logger"
import {Scene} from "../Model/scene"

export interface ICommand
{
  Execute(scene: Scene, logger: Logger): void;
  Revert(scene: Scene, logger: Logger): void;
}