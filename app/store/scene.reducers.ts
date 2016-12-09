import {ISceneRecord, NodeFactory, SceneFactory, PortFactory, INodeRecord} from './scene.types';
import {INewPortAction, NodeActions, INodeAction, IRenameNodeAction} from '../actions/node.actions';
import {INewNodeAction, SceneActions} from '../actions/scene.actions';
import {ISelectNodeAction} from '../actions/scene.actions';

import {Action, Reducer} from 'redux';
import undoable, {StateWithHistory} from 'redux-undo';


function newHistory<T>(initialState: T): StateWithHistory<T>
{
  return {past: [], present: initialState, future: []}
}

function selectNode(state: ISceneRecord, action: ISelectNodeAction): ISceneRecord
{
  return state.set("selected", action.nodeId);
}

function addNode(state: ISceneRecord, action: INewNodeAction): ISceneRecord
{
  const node = NodeFactory(action.node);
  return state.set("nodes", state.nodes.set(node.id, newHistory(node)));
}

function addPort(state: INodeRecord, action: INewPortAction): INodeRecord
{
  const port = PortFactory(action.port);
  const destination = action.isInput ? 'inputs' : 'outputs';
  return state.set(destination, state.inputs.push(port));
}

const renameNode = (state: INodeRecord, action: IRenameNodeAction): INodeRecord => state.set('name', action.newName);

const undoableNodeReducer: Reducer<StateWithHistory<INodeRecord>> = undoable(
  nodeReducer,
  {
    limit: 10,
    redoType: NodeActions.NODE_REDO,
    undoType: NodeActions.NODE_UNDO
  });


function nodeReducer(state: INodeRecord, action: INodeAction): INodeRecord
{
  switch (action.type)
  {
    case NodeActions.NEW_PORT:
    {
      return addPort(state, <INewPortAction>action);
    }

    case NodeActions.RENAME_NODE:
    {
      return renameNode(state, <IRenameNodeAction>action);
    }

    default:
      return state;
  }
}


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
    const nodes = state.nodes.update(action.nodeId, updateFunc);
    return state.set("nodes", nodes);
  }

  return state;
}