import { IScene } from './scene.types';
import { NodeActionCreators, nodeActions, isNodeAction } from '../actions/node.actions';
import { INewNodeAction, SceneActionCreators, INewFlowAction, isSceneAction, sceneActions } from '../actions/scene.actions';
import { ISelectItemAction } from '../actions/scene.actions';

import { INode } from './node.types';
import { nodeReducer } from './node.reducers';
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

const undoableNodeReducer: ActionReducer<History<INode>> = undoable(
  nodeReducer,
  {
    limit: 10,
    redoAction: nodeActions.REDO,
    undoAction: nodeActions.UNDO
  });

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
    nodes: [],
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
      case sceneActions.NEW_NODE:
        {
          const node = (<INewNodeAction>action).payload;
          return assign(
            { ...state },
            {
              nodes: [...state.nodes, newHistory(node)],
              selected: node.id
            });
        }

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

  if (isNodeAction(action))
  {
    return assign({ ...state }, {
      nodes: state.nodes.map(history => 
      {
        if (history.present.id != action.payload.nodeId)
          return history;

        return undoableNodeReducer(history, action);
      })
    });
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