import {Node, NodePort} from "../Model/node";
import {NodeSceneItem} from "./nodeSceneItem";
import {Sizes} from '../Common/theme';
import {Log} from '../LogComponent/log'
import {PortModel} from '../Forms/portModel';
import {Workspace} from './workspace';

export class NodeWorkspace extends Workspace
{
  constructor(public node: Node, sizes: Sizes, log: Log)
  {
    super(log);

    this.nodeInstance = new NodeSceneItem(node, sizes);

    //TODO: calculate that dynamically?
    this.nodeInstance.position.moveBy(20, 20);
  }

  public nodeInstance: NodeSceneItem

  public get name(): string
  {
    return this.node.name;
  }

  public addPort(port: NodePort): void
  {
    this.getNodes(port.isInput).push(port);
    this.nodeInstance.refresh();
  }

  public removePort(port: NodePort): void
  {
    var ports = this.getNodes(port.isInput);

    var index = ports.indexOf(port, 0);
    if (index > -1)
    {
      ports.splice(index, 1);
    }
    this.nodeInstance.refresh();
  }

  public editPort(port: NodePort, portModel:PortModel): void
  {
    port.name = portModel.name;
    port.dataType = portModel.dataType;
  }

  private getNodes(isInput: boolean)
  {
    var ports = isInput ? this.node.inputs : this.node.outputs;
    return ports;
  }
}