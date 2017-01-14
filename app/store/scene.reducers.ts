import { IScene } from './scene.types';
import { SceneActionCreators, INewFlowAction, isSceneAction, sceneActions } from '../actions/scene.actions';
import { ISelectItemAction } from '../actions/scene.actions';

import { assign } from './store';
import { IDataType } from './dataType.types';
import { IFlow } from './flow.types';
import { flowReducer } from './flow.reducers';
import { FlowActionCreators, flowActions, isFlowAction } from '../actions/flow.actions';
import { Action, ActionReducer } from '@ngrx/store';
import { History, undoable } from './undoable';

function newHistory<T>(initialState: T): History<T>
{
  return { past: [], present: initialState, future: [] }
}

const undoableFlowReducer: ActionReducer<History<IFlow>> = undoable(
  flowReducer,
  {
    limit: 10,
    redoAction: flowActions.REDO,
    undoAction: flowActions.UNDO
  });

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

export function sceneReducer(
  state: IScene = initialScene,
  action: Action): IScene
{
  if (isSceneAction(action))
  {
    switch (action.type)
    {
      case sceneActions.NEW_FLOW:
        {
          const flow = (<INewFlowAction>action).payload;
          return assign(
            { ...state },
            {
              flows: [...state.flows, newHistory(flow)],
              selected: flow.id
            });
        }

      case sceneActions.SELECT_ITEM:
        {
          return assign({ ...state }, { selected: (<ISelectItemAction>action).payload.itemId })
        }

      default:
        return state;
    }
  }

  if (isFlowAction(action))
  {
    return assign({ ...state }, {
      flows: state.flows.map(history => 
      {
        if (history.present.id != action.payload.flowId)
          return history;

        return undoableFlowReducer(history, action);
      })
    });
  }

  return state;
}