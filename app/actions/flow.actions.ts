import { IFlow, IPort, PortType } from '../store/flow.types';
import { newId } from './idgen';
import { IPortModel } from '../dialogs/portDialog.component';
import { IAppState } from '../store/store';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { type, createActionTypeChecker } from './utils';

export type FlowAction =
  INewFlowPortAction
  | IRenameFlowAction
  | IFlowUndoRedoAction
  | IDeletePortAction
  | IEditPortAction

export interface INewFlowPortAction extends Action
{
  payload: { flowId: number, port: IPort }
}
export interface IEditPortAction extends Action
{
  payload:
  {
    flowId: number,
    portId: number,
    name: string,
    dataTypeId: number,
    portType: PortType
  }
}

export interface IDeletePortAction extends Action
{
  payload: { flowId: number, portId: number }
}

export interface IRenameFlowAction extends Action
{
  payload: { flowId: number, newName: string; }
}

export interface IFlowUndoRedoAction extends Action
{
  payload: { flowId: number }
}

export const flowActions = {
  NEW_PORT: type('[Flow] New Port'),
  RENAME: type('[Flow] Rename'),
  EDIT_PORT: type('[Flow] Edit Port'),
  DELETE_PORT: type('[Flow] Delete Port'),
  UNDO: type('[Flow] Undo'),
  REDO: type('[Flow] Redo'),
};

export const isFlowAction = createActionTypeChecker<FlowAction>(flowActions);

@Injectable()
export class FlowActionCreators 
{
  newPort(portModel: IPortModel, flowId: number): INewFlowPortAction
  {
    const port: IPort =
      {
        id: newId(),
        name: portModel.name,
        dataTypeId: portModel.dataTypeId,
        type: portModel.portType
      };

    return { type: flowActions.NEW_PORT, payload: { port, flowId } };
  }

  rename(flowId: number, newName: string): IRenameFlowAction
  {
    return { type: flowActions.RENAME, payload: { newName, flowId } };
  }

  undo(flowId: number): IFlowUndoRedoAction
  {
    return { type: flowActions.UNDO, payload: { flowId } };
  }

  redo(flowId: number): IFlowUndoRedoAction
  {
    return { type: flowActions.REDO, payload: { flowId } };
  }

   editPort(portModel: IPortModel, portId: number, flowId: number): IEditPortAction
  {
    return {
      type: flowActions.EDIT_PORT,
      payload: {
        name: portModel.name,
        dataTypeId: portModel.dataTypeId,
        portType: portModel.portType,
        portId,
        flowId
      }
    };
  }

  deletePort(portId: number, flowId: number): IDeletePortAction
  {
    return { type: flowActions.DELETE_PORT, payload: { flowId, portId } };
  }
}