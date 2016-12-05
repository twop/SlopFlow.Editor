import {ISceneRecord, WorkspaceFactory, NodeFactory, SceneFactory} from './scene.types';
import {SceneAction} from '../actions/scene.actions';

export function sceneReducer(
  state: ISceneRecord = SceneFactory(),
  action: SceneAction): ISceneRecord
{
  switch (action.type)
  {
    case 'NEW_NODE':
      const node = NodeFactory(action.node);
      const workspace = WorkspaceFactory({node});
      return state.set("workspaces", state.workspaces.push(workspace));

    default:
      return state;
  }
}