import {combineReducers} from 'redux';
import {IScene, SceneFactory} from './scene.types';
import {sceneReducer} from './scene.reducers';

export interface IAppState
{
  scene: IScene
}

export const INITIAL_STATE: IAppState = {scene: SceneFactory()};

export const rootReducer = combineReducers<IAppState>(
  {
    scene: sceneReducer
  });

