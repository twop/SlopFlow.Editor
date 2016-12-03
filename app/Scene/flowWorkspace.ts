import {Log} from '../LogComponent/log'
import {Workspace} from './workspace';
import {Flow} from '../Model/flow';
import {LayoutService, INodeLayout, IFlowLayout} from './layout.service';
import {INode} from '../Model/nodeInterface';
import {ToolbarItem, ToolbarIcons} from './toolbar';
import {ModalService} from '../Forms/modal.service';

export class FlowWorkspace extends Workspace
{
  constructor(
    public flow: Flow,
    log: Log,
    private layoutService: LayoutService,
    private modalService: ModalService)
  {
    super(log);

    this.layout = layoutService.buildFlowLayout(flow);

//    const addPort = new ToolbarItem("Port", () => this.requestNewPort(), ToolbarIcons.addNew);
//    const rename = new ToolbarItem("Rename", () => this.requestRename(), ToolbarIcons.edit);
    const undo = new ToolbarItem("Undo", () => this.undo(), ToolbarIcons.undo, this.canUndo);
    const redo = new ToolbarItem("Redo", () => this.redo(), ToolbarIcons.redo, this.canRedo);

    this.toolbar.items.push(undo, redo);
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