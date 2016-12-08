import {ISceneRecord, NodeFactory, SceneFactory, PortFactory, INodeRecord, INode} from './scene.types';
import {SceneAction} from '../actions/scene.actions';

export function sceneReducer(
  state: ISceneRecord = SceneFactory(),
  action: SceneAction): ISceneRecord
{
  switch (action.type)
  {
    case 'NEW_NODE':
    {
      const node = NodeFactory(action.node);
      return state.set("nodes", state.nodes.set(node.id, node));
    }

    case 'NEW_PORT':
    {
      const port = PortFactory(action.port);
      const destination = action.isInput? 'inputs' : 'outputs';
      const nodes = state.nodes.update(action.nodeId, (node:INodeRecord)=>node.set(destination, node.inputs.push(port)));
      return state.set("nodes", nodes);
    }

    case "SELECT_NODE":
    {
      return state.set("selected", action.nodeId);
    }

    default:
      return state;
  }
}