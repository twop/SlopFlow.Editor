import {Node, NodePort} from "../Model/node";
import {Log} from '../LogComponent/log'
import {PortModel} from '../Forms/portModel';
import {Workspace} from './workspace';
import {LayoutService, INodeLayout} from './layout.service';
import {Point} from '../Geometry/point';
import {Toolbar, Glyphicons, ToolbarItem} from './toolbar';
import {NewPortRequest, EditPortRequest} from '../Common/portEvents';
import {NodeEventService} from '../Common/nodeEvent.service';
import {DeletePortCommand} from './Commands/deletePortCommand';

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

    const addPort = new ToolbarItem("Port", ()=> this.requestNewPort(), Glyphicons.addNew);
    const rename = new ToolbarItem("Rename", ()=> this.requestRename(), Glyphicons.edit);
    const undo = new ToolbarItem("Undo", ()=> this.undo(), Glyphicons.undo, this.canUndo);
    const redo = new ToolbarItem("Redo", ()=> this.redo(), Glyphicons.redo, this.canRedo);

    this.toolbar.items.push(addPort, rename, undo, redo);
  }

  public layout:INodeLayout;

  public get name(): string
  {
    return this.node.name;
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

  public buildPortToolbar = (port: NodePort): Toolbar =>
     new Toolbar(
      port.name,
      new ToolbarItem("Edit", ()=> this.requestEditPort(port), Glyphicons.edit),
      new ToolbarItem("Delete", ()=> this.deletePort(port), Glyphicons.delete) );

  private requestEditPort = (port: NodePort) => this.eventService.requestEditPort.emit(new EditPortRequest(port, this));
  private requestNewPort = () => this.eventService.requestNewPort.emit(new NewPortRequest("new port", this));
  private requestRename = () => this.eventService.requestEditNode.emit(this);
  private deletePort = (port: NodePort) => this.executeCommand(new DeletePortCommand(port));

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