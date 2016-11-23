import {Node, NodePort} from "../Model/node";
import {Log} from '../LogComponent/log'
import {PortModel} from '../Forms/portModel';
import {Workspace} from './workspace';
import {LayoutService, INodeLayout} from './layout.service';
import {Point} from '../Geometry/point';
import {Toolbar, Glyphicons, ToolbarItem} from './toolbar';
import {NewPortRequest} from '../Common/portEvents';
import {NodeEventService} from '../Common/nodeEvent.service';

export class NodeWorkspace extends Workspace
{
  constructor(
    public node: Node,
    log: Log,
    private layoutService:LayoutService,
    private eventService: NodeEventService)
  {
    super(log);
    this.layout = layoutService.buildNodeLayout(node, new Point(10,15));

    const addPort = new ToolbarItem("Port", ()=> this.requestNewPort(), true, Glyphicons.addNew);
    const rename = new ToolbarItem("Rename", ()=> this.requestRename(), true, Glyphicons.edit);
    const undo = new ToolbarItem("Undo", ()=> this.undo(), this.canUndo, Glyphicons.undo);
    const redo = new ToolbarItem("Redo", ()=> this.redo(), this.canRedo, Glyphicons.redo);

    this.toolbar.items.push(addPort, rename, undo, redo);
  }

  public layout:INodeLayout;

  public get name(): string
  {
    return this.node.name;
  }

  public requestNewPort(): void
  {
    this.eventService.requestNewPort.emit(new NewPortRequest("new port", this));
  }

  public requestRename(): void
  {
    this.eventService.requestEditNode.emit(this);
  }

  public addPort(port: NodePort): void
  {
    this.getNodes(port.isInput).push(port);
  }

  public removePort(port: NodePort): void
  {
    var ports = this.getNodes(port.isInput);

    var index = ports.indexOf(port, 0);
    if (index > -1)
    {
      ports.splice(index, 1);
    }
  }

  public editPort(port: NodePort, portModel:PortModel): void
  {
    port.name = portModel.name;
    port.dataType = portModel.dataType;
  }

  protected onModifiedInternal(): void
  {
    this.layout = this.layoutService.buildNodeLayout(this.node, new Point(10,15));
  }

  private getNodes(isInput: boolean)
  {
    var ports = isInput ? this.node.inputs : this.node.outputs;
    return ports;
  }

}