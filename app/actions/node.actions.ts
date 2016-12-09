import {Injectable} from '@angular/core';
import {NgRedux} from 'ng2-redux';
import {IAppState} from '../store/store';
import {INode, IPort} from '../store/scene.types';
import {newId} from './idgen';
import {Action} from 'redux';
import {StateWithHistory} from 'redux-undo';

export interface INodeAction extends Action
{
  nodeId: number;
  type: string;
}

export interface INewPortAction extends INodeAction
{
  port: IPort;
  isInput: boolean;
}

export interface IRenameNodeAction extends INodeAction
{
  newName:string;
}

export interface INodeUndoAction extends INodeAction {}
export interface INodeRedoAction extends INodeAction {}


@Injectable()
export class NodeActions
{
  static readonly NEW_PORT = 'NEW_PORT';
  static readonly RENAME_NODE = 'RENAME_NODE';
  static readonly NODE_UNDO = 'NODE_UNDO';
  static readonly NODE_REDO = 'NODE_REDO';

  static isNodeAction(action: {type: string, nodeId?: number }): action is INodeAction
  {
    return action.nodeId !== undefined;
  }

  constructor(private ngRedux: NgRedux<IAppState>) {}

  newPort(portName: string, isInput: boolean, node: INode): void
  {
    const id = newId();
    const port: IPort = {name: portName + id.toString(), id};
    this.ngRedux.dispatch<INewPortAction>(
      {
        type: NodeActions.NEW_PORT,
        port,
        isInput,
        nodeId: node.id
      });
  }

  rename = (nodeId:number, newName:string): void => this.ngRedux.dispatch<IRenameNodeAction>(
    {
      type: NodeActions.RENAME_NODE,
      nodeId,
      newName
    });

  undo = (nodeId:number): void => this.ngRedux.dispatch<INodeUndoAction>(
    {
      type: NodeActions.NODE_UNDO,
      nodeId
    });

  redo = (nodeId:number): void => this.ngRedux.dispatch<INodeRedoAction>(
    {
      type: NodeActions.NODE_REDO,
      nodeId
    });
}