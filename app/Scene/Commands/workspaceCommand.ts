import {Log} from "../../LogComponent/log"
import {NodeWorkspace} from '../nodeWorkspace';

export interface IWorkSpaceCommand
{
  Execute(workspace: NodeWorkspace, logger: Log): void;
  Revert(workspace: NodeWorkspace, logger: Log): void;
}