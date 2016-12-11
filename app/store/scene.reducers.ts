import {ISceneRecord, SceneFactory} from './scene.types';
import {NodeActions} from '../actions/node.actions';
import {INewNodeAction, SceneActions} from '../actions/scene.actions';
import {ISelectNodeAction} from '../actions/scene.actions';

import {Action, Reducer} from 'redux';
import undoable, {StateWithHistory} from 'redux-undo';

import {NodeFactory, INodeRecord} from './node.types';
import {nodeReducer} from './node.reducers';


function newHistory<T>(initialState: T): StateWithHistory<T>
{
  return {past: [], present: initialState, future: []}
}

function selectNode(state: ISceneRecord, action: ISelectNodeAction): ISceneRecord
{
  return state.withMutations(scene => scene.selected = action.nodeId);
}

function addNode(state: ISceneRecord, action: INewNodeAction): ISceneRecord
{
  const node = NodeFactory(action.node);

  return state.withMutations(scene =>
  {
    scene.nodes = state.nodes.set(node.id, newHistory(node));
    scene.selected = node.id
  });
}

const undoableNodeReducer: Reducer<StateWithHistory<INodeRecord>> = undoable(
  nodeReducer,
  {
    limit: 10,
    redoType: NodeActions.NODE_REDO,
    undoType: NodeActions.NODE_UNDO
  });

export function sceneReducer(
  state: ISceneRecord = SceneFactory(),
  action: Action): ISceneRecord
{
  if (SceneActions.isSceneAction(action))
  {
    switch (action.type)
    {
      case SceneActions.NEW_NODE:
      {
        return addNode(state, action as INewNodeAction);
      }

      case SceneActions.SELECT_NODE:
      {
        return selectNode(state, action as ISelectNodeAction)
      }

      default:
        return state;
    }
  }

  if (NodeActions.isNodeAction(action))
  {
    const updateFunc = (nodeHistory: StateWithHistory<INodeRecord>) => undoableNodeReducer(nodeHistory, action);
    return state.withMutations(scene => scene.nodes = state.nodes.update(action.nodeId, updateFunc));
  }

  return state;
}