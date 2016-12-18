import { IScene } from './scene.types';
import { NodeActions } from '../actions/node.actions';
import { INewNodeAction, SceneActions, INewFlowAction } from '../actions/scene.actions';
import { ISelectItemAction } from '../actions/scene.actions';

import { Action, Reducer } from 'redux';
import undoable, { StateWithHistory } from 'redux-undo';

import { INode } from './node.types';
import { nodeReducer } from './node.reducers';
import { assign } from './store';
import { IDataType } from './dataType.types';
import { IFlow } from './flow.types';
import { flowReducer } from './flow.reducers';
import { FlowActions } from '../actions/flow.actions';

function newHistory<T>(initialState: T): StateWithHistory<T>
{
  return { past: [], present: initialState, future: [] }
}

const undoableNodeReducer: Reducer<StateWithHistory<INode>> = undoable(
  nodeReducer,
  {
    limit: 10,
    redoType: NodeActions.NODE_REDO,
    undoType: NodeActions.NODE_UNDO
  });

const undoableFlowReducer: Reducer<StateWithHistory<IFlow>> = undoable(
  flowReducer,
  {
    limit: 10,
    redoType: FlowActions.FLOW_REDO,
    undoType: FlowActions.FLOW_UNDO
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
  if (SceneActions.isSceneAction(action))
  {
    switch (action.type)
    {
      case SceneActions.NEW_NODE:
        {
          const node = (<INewNodeAction>action).node;
          return assign(
            { ...state },
            {
              nodes: [...state.nodes, newHistory(node)],
              selected: node.id
            });
        }

      case SceneActions.NEW_FLOW:
        {
          const flow = (<INewFlowAction>action).flow;
          return assign(
            { ...state },
            {
              flows: [...state.flows, newHistory(flow)],
              selected: flow.id
            });
        }

      case SceneActions.SELECT_ITEM:
        {
          return assign({ ...state }, { selected: (<ISelectItemAction>action).itemId })
        }

      default:
        return state;
    }
  }

  if (NodeActions.isNodeAction(action))
  {
    return assign({ ...state }, {
      nodes: state.nodes.map(history => 
      {
        if (history.present.id != action.nodeId)
          return history;

        return undoableNodeReducer(history, action);
      })
    });
  }

  if (FlowActions.isFlowAction(action))
  {
    return assign({ ...state }, {
      flows: state.flows.map(history => 
      {
        if (history.present.id != action.flowId)
          return history;

        return undoableFlowReducer(history, action);
      })
    });
  }

  return state;
}