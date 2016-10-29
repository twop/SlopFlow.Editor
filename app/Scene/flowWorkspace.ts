import {Log} from '../LogComponent/log'
import {Workspace} from './workspace';
import {Flow} from '../Model/flow';
import {LayoutService, INodeLayout, IFlowLayout} from '../WorkspaceComponent/layout.service';
import {INode} from '../Model/nodeInterface';

export class FlowWorkspace extends Workspace
{
  constructor(public flow: Flow, log: Log, layoutService: LayoutService)
  {
    super(log);

    this.layout = layoutService.buildFlowLayout(flow);
  }

  readonly layout: IFlowLayout;

  public get name(): string
  {
    return this.flow.name;
  }
}