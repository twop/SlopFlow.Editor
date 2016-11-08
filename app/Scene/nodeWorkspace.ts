import {Node, NodePort} from "../Model/node";
import {Log} from '../LogComponent/log'
import {PortModel} from '../Forms/portModel';
import {Workspace} from './workspace';
import {LayoutService, INodeLayout} from '../WorkspaceComponent/layout.service';
import {Point} from '../Geometry/point';

export class NodeWorkspace extends Workspace
{
  constructor(public node: Node, log: Log, private layoutService:LayoutService)
  {
    super(log);
    this.layout = layoutService.buildNodeLayout(node, new Point(10,15));
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