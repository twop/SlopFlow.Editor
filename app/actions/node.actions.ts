import { Injectable } from '@angular/core';
import { newId } from './idgen';
import { StateWithHistory } from 'redux-undo';
import { IPortModel } from '../dialogs/portDialog.component';
import { IPort, PortType } from '../store/node.types';
import { IAppState } from '../store/store';
import { Action, Store } from '@ngrx/store';
import { type, createActionTypeChecker } from './utils';

export type NodeAction =
  INewNodePortAction
  | IEditPortAction
  | IDeletePortAction
  | INodeUndoRedoAction;

export const nodeActions = {
  NEW_PORT: type('[Node] New Port'),
  EDIT_PORT: type('[Node] Edit Port'),
  DELETE_PORT: type('[Node] Delete Port'),
  RENAME: type('[Node] Rename'),
  UNDO: type('[Node] Undo'),
  REDO: type('[Node] Redo'),
};

export const isNodeAction = createActionTypeChecker<NodeAction>(nodeActions);

export interface INewNodePortAction extends Action
{
  payload: { nodeId: number, port: IPort }
}

export interface IEditPortAction extends Action
{
  payload:
  {
    nodeId: number,
    portId: number,
    name: string,
    dataTypeId: number,
    portType: PortType
  }
}

export interface IDeletePortAction extends Action
{
  payload: { nodeId: number, portId: number }
}

export interface IRenameNodeAction extends Action
{
  payload: { nodeId: number, newName: string }
}

export interface INodeUndoRedoAction extends Action
{
  payload: { nodeId: number }
}

@Injectable()
export class NodeActionCreators
{
  newPort(portModel: IPortModel, nodeId: number): INewNodePortAction
  {
    const port: IPort =
      {
        id: newId(),
        name: portModel.name,
        dataTypeId: portModel.dataTypeId,
        type: portModel.portType
      };

    return { type: nodeActions.NEW_PORT, payload: { nodeId, port } };
  }

  editPort(portModel: IPortModel, portId: number, nodeId: number): IEditPortAction
  {
    return {
      type: nodeActions.NEW_PORT,
      payload: {
        name: portModel.name,
        dataTypeId: portModel.dataTypeId,
        portType: portModel.portType,
        portId,
        nodeId
      }
    };
  }

  deletePort(portId: number, nodeId: number): IDeletePortAction
  {
    return { type: nodeActions.NEW_PORT, payload: { nodeId, portId } };
  }

  rename(nodeId: number, newName: string): IRenameNodeAction
  {
    return { type: nodeActions.RENAME, payload: { nodeId, newName } }
  };

  undo(nodeId: number): INodeUndoRedoAction 
  {
    return { type: nodeActions.UNDO, payload: { nodeId } }
  };

  redo(nodeId: number): INodeUndoRedoAction
  {
    return { type: nodeActions.REDO, payload: { nodeId } }
  };
}