import {Log} from '../LogComponent/log'
import {Workspace} from './workspace';
import {Flow} from '../Model/flow';
import {LayoutService, INodeLayout, IFlowLayout} from './layout.service';
import {INode} from '../Model/nodeInterface';

export class FlowWorkspace extends Workspace
{
  constructor(public flow: Flow, log: Log, private layoutService: LayoutService)
  {
    super(log);

    this.layout = layoutService.buildFlowLayout(flow);
  }

  public layout: IFlowLayout;

  public get name(): string
  {
    return this.flow.name;
  }

  protected onModifiedInternal(): void
  {
    this.layout = this.layoutService.buildFlowLayout(this.flow);
  }
}