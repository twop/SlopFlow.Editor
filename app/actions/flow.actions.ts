import { IFlow, IPort, PortType, IFlowElement, IElementPort } from '../store/flow.types';
import { newId } from './idgen';
import { IPortModel } from '../dialogs/portDialog.component';
import { IAppState } from '../store/store';
import { Action } from '@ngrx/store';
import { type, createActionTypeChecker } from './utils';
import { Point } from '../geometry/point';

export type FlowAction =
  INewFlowPortAction
  | IRenameFlowAction
  | IFlowUndoRedoAction
  | IDeletePortAction
  | IEditPortAction

export const flowActions =
  {
    NEW_PORT: type('[Flow] New Port'),
    RENAME: type('[Flow] Rename'),
    EDIT_PORT: type('[Flow] Edit Port'),
    DELETE_PORT: type('[Flow] Delete Port'),
    UNDO: type('[Flow] Undo'),
    REDO: type('[Flow] Redo'),
    ADD_ELEMENT: type('[Flow] Add Element'),
  };

export const isFlowAction = createActionTypeChecker<FlowAction>(flowActions);

export interface INewFlowPortAction extends Action
{
  payload: { flowId: number, port: IPort }
}

export interface INewElementAction extends Action
{
  payload: { flowId: number, element: IFlowElement }
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

export const flowActionCreators =
  {
    rename(flowId: number, newName: string): IRenameFlowAction
    {
      return { type: flowActions.RENAME, payload: { newName, flowId } };
    },

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
    },

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
    },

    deletePort(portId: number, flowId: number): IDeletePortAction
    {
      return { type: flowActions.DELETE_PORT, payload: { flowId, portId } };
    },

    addElement(flowId: number, name: string, origin: IFlow, position: Point): INewElementAction
    {
      const element: IFlowElement =
        {
          id: newId(),
          originId: origin.id,
          type: origin.type,
          name,
          position,
          ports: origin.ports.map(port =>
          {
            return { ...port, originPortId: port.id, id: newId() }
          })

        };

      return { type: flowActions.ADD_ELEMENT, payload: { flowId, element } };
    },

    undo(flowId: number): IFlowUndoRedoAction
    {
      return { type: flowActions.UNDO, payload: { flowId } };
    },

    redo(flowId: number): IFlowUndoRedoAction
    {
      return { type: flowActions.REDO, payload: { flowId } };
    },
  }