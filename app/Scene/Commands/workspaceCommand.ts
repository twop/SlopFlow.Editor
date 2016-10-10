import {Log} from "../../LogComponent/log"
import {NodeWorkspace} from '../nodeWorkspace';
import {Workspace} from '../workspace';

export interface IWorkSpaceCommand
{
  Execute(workspace: Workspace, logger: Log): void;
  Revert(workspace: Workspace, logger: Log): void;
}