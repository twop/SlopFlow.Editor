import {EventEmitter} from '@angular/core';

import {IWorkSpaceCommand} from './Commands/workspaceCommand';
import {Log} from '../LogComponent/log'
import {Toolbar} from './toolbar';

export abstract class Workspace
{
  constructor(private log: Log)
  {}

  public toolbar: Toolbar = new Toolbar();

  public modified = new EventEmitter<Workspace>();

  private undoCommands: IWorkSpaceCommand[] = [];
  private redoCommands: IWorkSpaceCommand[] = [];

  public abstract get name(): string;

  public canRedo = (): boolean => this.redoCommands.length > 0;
  public canUndo = (): boolean => this.undoCommands.length > 0;

  public undo(): void
  {
    if (!this.canUndo())
      return;

    var command = this.undoCommands.pop();
    this.revertCommandInternal(command);
    this.redoCommands.push(command);
  }

  public redo(): void
  {
    if (!this.canRedo())
      return;

    var command = this.redoCommands.pop();
    this.executeCommandInternal(command);
    this.undoCommands.push(command);
  }

  public executeCommand(command: IWorkSpaceCommand): void
  {
    this.executeCommandInternal(command);
    this.undoCommands.push(command);
    this.redoCommands.splice(0, this.redoCommands.length);
  }

  protected abstract onModifiedInternal(): void;

  private executeCommandInternal(command: IWorkSpaceCommand): void
  {
    command.Execute(this, this.log);
    this.onModifiedInternal();
    this.modified.emit(this);
  }

  private revertCommandInternal(command: IWorkSpaceCommand): void
  {
    command.Revert(this, this.log);
    this.onModifiedInternal();
    this.modified.emit(this);
  }
}
