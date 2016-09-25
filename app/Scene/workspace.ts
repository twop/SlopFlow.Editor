import {Node} from "./node";
import {ViewInstance} from "./viewInstance";
import {Port} from './port';
import {Sizes} from '../WorkspaceComponent/theme';
import {Log} from '../LogComponent/log'
import {IWorkSpaceCommand} from './Commands/workspaceCommand';
import {EventEmitter} from '@angular/core';

export class Workspace
{
  constructor(public node: Node, private sizes: Sizes, private log: Log)
  {
    this.name = node.name;
    this.viewNode = new ViewInstance(node);

    //TODO: calculate that dynamically?
    this.viewNode.position.moveBy(20, 20);
  }

  public modified = new EventEmitter<Workspace>();
  public viewNode: ViewInstance
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

  public addPort(port: Port, isInput: boolean): void
  {
    this.getNodes(isInput).push(port);
    this.node.recalculateSize(this.sizes);
  }

  public removePort(port: Port, isInput: boolean): void
  {
    var ports = this.getNodes(isInput);

    var index = ports.indexOf(port, 0);
    if (index > -1)
    {
      ports.splice(index, 1);
    }
    this.node.recalculateSize(this.sizes);
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