import {Node, NodePort} from "../Model/node";
import {NodeSceneItem} from "./nodeSceneItem";
import {Sizes} from '../Common/theme';
import {Log} from '../LogComponent/log'
import {IWorkSpaceCommand} from './Commands/workspaceCommand';
import {EventEmitter} from '@angular/core';
import {PortModel} from '../Forms/portModel';

export class NodeWorkspace
{
  constructor(public node: Node, sizes: Sizes, private log: Log)
  {
    this.name = node.name;
    this.nodeInstance = new NodeSceneItem(node, sizes);

    //TODO: calculate that dynamically?
    this.nodeInstance.position.moveBy(20, 20);
  }

  public modified = new EventEmitter<NodeWorkspace>();
  public nodeInstance: NodeSceneItem
  public name: string;

  private undoCommands: IWorkSpaceCommand[] = [];
  private redoCommands: IWorkSpaceCommand[] = [];

  public get canRedo(): boolean {return this.redoCommands.length > 0;}

  public get canUndo(): boolean {return this.undoCommands.length > 0;}

  public undo(): void
  {
    if (!this.canUndo)
      return;

    var command = this.undoCommands.pop();
    this.revertCommandInternal(command);
    this.redoCommands.push(command);
  }

  public redo(): void
  {
    if (!this.canRedo)
      return;

    var command = this.redoCommands.pop();
    this.executeCommandInternal(command);
    this.undoCommands.push(command);
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

  public executeCommand(command: IWorkSpaceCommand): void
  {
    this.executeCommandInternal(command);
    this.undoCommands.push(command);
    this.redoCommands.splice(0, this.redoCommands.length);
  }

  public executeCommandInternal(command: IWorkSpaceCommand): void
  {
    command.Execute(this, this.log);
    this.modified.emit(this);
  }

  public revertCommandInternal(command: IWorkSpaceCommand): void
  {
    command.Revert(this, this.log);
    this.modified.emit(this);
  }

  private getNodes(isInput: boolean)
  {
    var ports = isInput ? this.node.inputs : this.node.outputs;
    return ports;
  }
}