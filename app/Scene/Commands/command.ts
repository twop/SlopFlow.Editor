import {Log} from "../../LogComponent/log"
import {Scene} from "../scene"

export interface ICommand
{
  Execute(scene: Scene, logger: Log): void;
  Revert(scene: Scene, logger: Log): void;
}