import {combineReducers} from 'redux';
import {IScene } from './scene.types';
import {sceneReducer} from './scene.reducers';

export function assign<T extends Object>(obj: T, props: Partial<T>): T
{
  return Object.assign(obj, props);
}

export interface IAppState
{
  scene: IScene
}

export const INITIAL_STATE: IAppState = {scene: sceneReducer(undefined, {type:100500})};

export const rootReducer = combineReducers<IAppState>(
  {
    scene: sceneReducer
  });

