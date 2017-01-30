import { createHandlers, createReducer, flattenNode, HandlerNode, Handlers, StatePipe } from './structuredReducer';
import { IScene } from './scene.types';
import { sceneActionCreators, INewFlowAction, sceneActions } from '../actions/scene.actions';
import { ISelectItemAction } from '../actions/scene.actions';

import { assign } from './store';
import { IDataType } from './dataType.types';
import { IFlow } from './flow.types';
import { flowHandlers } from './flow.reducers';
import { FlowAction, flowActionCreators, flowActions } from '../actions/flow.actions';
import { Action, ActionReducer } from '@ngrx/store';
import { History, undoable } from './undoable';

const intType: IDataType = { id: -1, name: 'int' };
const stringType: IDataType = { id: -2, name: 'string' };
const boolType: IDataType = { id: -3, name: 'boolean' };
const floatType: IDataType = { id: -4, name: 'float' };

const initialScene: IScene =
  {
    selected: -1,
    flows: [],
    types: [intType, stringType, floatType, boolType]
  };


const undoableFlowReducer: ActionReducer<History<IFlow>> = undoable(
  createReducer(flowHandlers),
  {
    limit: 10,
    redoAction: flowActions.REDO,
    undoAction: flowActions.UNDO
  });

const flowActionTypes: string[] = Object.keys(flowActions).map(key => flowActions[key]);
const flowHistoryHandlers: Handlers<History<IFlow>> = createHandlers(undoableFlowReducer, flowActionTypes);

const flowStatePipe: StatePipe<History<IFlow>, IScene> =
  {
    diveIn: (scene: IScene, {payload}: FlowAction) => scene.flows.find(f => f.present.id === payload.flowId),
    bubbleUp: (scene: IScene, newHistory: History<IFlow>) =>
    {
      return assign(
        { ...scene },
        {
          flows: scene.flows.map(history => 
          {
            if (history.present.id != newHistory.present.id)
              return history;

            return newHistory;
          })
        });
    }
  };

const sceneHandlers: Handlers<IScene> =
  {
    [sceneActions.NEW_FLOW]: (scene, {payload: flow}: INewFlowAction) => assign(
      { ...scene },
      {
        flows: [...scene.flows, { past: [], present: flow, future: [] }],
        selected: flow.id
      }),

    [sceneActions.SELECT_ITEM]: (scene, {payload}: ISelectItemAction) => assign({ ...scene }, { selected: payload.itemId })
  };

const sceneNode: HandlerNode<IScene> =
  {
    handlers: sceneHandlers,
    children: [
      {
        handlers: flowHistoryHandlers,
        pipe: flowStatePipe,
      }]
  }

const flattenHandlers = flattenNode(sceneNode);
//console.log("scene handlers:", flattenHandlers);
export const sceneReducer = createReducer(flattenHandlers, initialScene);