import {Injectable} from '@angular/core';
import {NgRedux} from 'ng2-redux';
import {newId} from './idgen';
import {Action} from 'redux';
import {StateWithHistory} from 'redux-undo';
import {IPortModel} from '../dialogs/portDialog.component';
import {IPort, INode} from '../store/node.types';
import {IAppState} from '../store/store';

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
  newName: string;
}

export interface INodeUndoAction extends INodeAction
{
}

export interface INodeRedoAction extends INodeAction
{
}


@Injectable()
export class NodeActions
{
  static readonly NEW_PORT = 'NEW_PORT';
  static readonly RENAME_NODE = 'RENAME_NODE';
  static readonly NODE_UNDO = 'NODE_UNDO';
  static readonly NODE_REDO = 'NODE_REDO';

  private static all = [
    NodeActions.NEW_PORT,
    NodeActions.RENAME_NODE,
    NodeActions.NODE_REDO,
    NodeActions.NODE_UNDO];

  static isNodeAction(action: {type: string}): action is INodeAction
  {
    return NodeActions.all.findIndex((t) => t === action.type) >= 0;
  }

  constructor(private ngRedux: NgRedux<IAppState>) {}

  newPort(portModel: IPortModel, node: INode): void
  {
    const port: IPort =
            {
              id: newId(),
              name: portModel.name,
              dataTypeId: portModel.dataTypeId,
            };

    this.ngRedux.dispatch<INewPortAction>(
      {
        type: NodeActions.NEW_PORT,
        port,
        isInput: portModel.isInput,
        nodeId: node.id
      });
  }

  rename = (nodeId: number, newName: string): void => this.ngRedux.dispatch<IRenameNodeAction>(
    {
      type: NodeActions.RENAME_NODE,
      nodeId,
      newName
    });

  undo = (nodeId: number): void => this.ngRedux.dispatch<INodeUndoAction>(
    {
      type: NodeActions.NODE_UNDO,
      nodeId
    });

  redo = (nodeId: number): void => this.ngRedux.dispatch<INodeRedoAction>(
    {
      type: NodeActions.NODE_REDO,
      nodeId
    });
}