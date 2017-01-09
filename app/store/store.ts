import {combineReducers} from 'redux';
import {IScene } from './scene.types';
import {sceneReducer} from './scene.reducers';
import { type } from '../actions/utils';

export function assign<T extends Object>(obj: T, props: Partial<T>): T
{
  return Object.assign(obj, props);
}

export interface IAppState
{
  scene: IScene
}

export const INITIAL_STATE: IAppState = {scene: sceneReducer(undefined, {type: "some type"})};

export const rootReducer = combineReducers<IAppState>(
  {
    scene: sceneReducer
  });

