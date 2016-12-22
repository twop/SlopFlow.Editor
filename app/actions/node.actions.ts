import {Injectable} from '@angular/core';
import {NgRedux} from 'ng2-redux';
import {newId} from './idgen';
import {Action} from 'redux';
import {StateWithHistory} from 'redux-undo';
import {IPortModel} from '../dialogs/portDialog.component';
import {IPort, PortType} from '../store/node.types';
import {IAppState} from '../store/store';

export interface INodeAction extends Action
{
  nodeId: number;
}

export interface INewNodePortAction extends INodeAction
{
  port: IPort;
}

export interface IEditPortAction extends INodeAction
{
  portId: number;
  name: string;
  dataTypeId: number;
  portType: PortType;
}

export interface IDeletePortAction extends INodeAction
{
  portId: number;
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
  static readonly NEW_NODE_PORT = 'NEW_NODE_PORT';
  static readonly EDIT_PORT = 'EDIT_PORT';
  static readonly DELETE_PORT = 'DELETE_PORT ';
  static readonly RENAME_NODE = 'RENAME_NODE';
  static readonly NODE_UNDO = 'NODE_UNDO';
  static readonly NODE_REDO = 'NODE_REDO';

  // TODO is there a better solution for that?
  private static all = [
    NodeActions.NEW_NODE_PORT,
    NodeActions.RENAME_NODE,
    NodeActions.NODE_REDO,
    NodeActions.NODE_UNDO,
    NodeActions.EDIT_PORT,
    NodeActions.DELETE_PORT,
  ];

  static isNodeAction(action: {type: string}): action is INodeAction
  {
    return NodeActions.all.findIndex((t) => t === action.type) >= 0;
  }

  constructor(private ngRedux: NgRedux<IAppState>) {}

  newPort(portModel: IPortModel, nodeId: number): void
  {
    const port: IPort =
            {
              id: newId(),
              name: portModel.name,
              dataTypeId: portModel.dataTypeId,
              type: portModel.portType
            };

    this.ngRedux.dispatch<INewNodePortAction>(
      {
        type: NodeActions.NEW_NODE_PORT,
        port,
        nodeId
      });
  }

  editPort(portModel: IPortModel, portId: number, nodeId: number): void
  {
    this.ngRedux.dispatch<IEditPortAction>(
      {
        type: NodeActions.EDIT_PORT,
        name: portModel.name,
        dataTypeId: portModel.dataTypeId,
        portType: portModel.portType,
        portId,
        nodeId
      });
  }

  deletePort(portId: number, nodeId: number): void
  {
    this.ngRedux.dispatch<IDeletePortAction>(
      {
        type: NodeActions.DELETE_PORT,
        portId,
        nodeId
      });
  }

  rename = (nodeId: number, newName: string) => this.ngRedux.dispatch<IRenameNodeAction>(
    {
      type: NodeActions.RENAME_NODE,
      nodeId,
      newName
    });

  undo = (nodeId: number) => this.ngRedux.dispatch<INodeUndoAction>(
    {
      type: NodeActions.NODE_UNDO,
      nodeId
    });

  redo = (nodeId: number) => this.ngRedux.dispatch<INodeRedoAction>(
    {
      type: NodeActions.NODE_REDO,
      nodeId
    });
}