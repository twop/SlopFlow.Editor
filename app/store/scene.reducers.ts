import {IScene} from './scene.types';
import {NodeActions} from '../actions/node.actions';
import { INewNodeAction, SceneActions } from '../actions/scene.actions';
import {ISelectNodeAction} from '../actions/scene.actions';

import {Action, Reducer} from 'redux';
import undoable, {StateWithHistory} from 'redux-undo';

import {INode} from './node.types';
import {nodeReducer} from './node.reducers';
import { assign } from './store';
import { IDataType } from './dataType.types';

function newHistory<T>(initialState: T): StateWithHistory<T>
{
  return {past: [], present: initialState, future: []}
}

const undoableNodeReducer: Reducer<StateWithHistory<INode>> = undoable(
  nodeReducer,
  {
    limit: 10,
    redoType: NodeActions.NODE_REDO,
    undoType: NodeActions.NODE_UNDO
  });

const intType:IDataType = {id:-1, name:'int'};
const stringType:IDataType = {id:-2, name:'string'};
const boolType:IDataType = {id:-3, name:'boolean'};
const floatType:IDataType = {id:-4, name:'float'};

const initialScene: IScene =
        {
          selected: -1,
          nodes: [],
          types: [intType, stringType, floatType, boolType]
        };


export function sceneReducer(
  state: IScene = initialScene,
  action: Action): IScene
{
  if ( SceneActions.isSceneAction(action))
  {
    switch (action.type)
    {
      case SceneActions.NEW_NODE:
      {
        const node = (<INewNodeAction>action).node;
        return assign(
          {...state},
          {
            nodes: [...state.nodes, newHistory(node)],
            selected: node.id
          });
      }

      case SceneActions.SELECT_NODE:
      {
        return assign({...state}, {selected: (<ISelectNodeAction>action).nodeId})
      }

      default:
        return state;
    }
  }

  if (NodeActions.isNodeAction(action))
  {
    return assign({...state}, {nodes: state.nodes.map(history => 
    {
        if (history.present.id != action.nodeId)
          return history;
        
        return undoableNodeReducer(history, action);
    })});
  }

  return state;
}