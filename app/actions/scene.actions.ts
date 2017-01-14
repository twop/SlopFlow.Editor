import { Injectable } from '@angular/core';
import { IAppState } from '../store/store';
import { newId } from './idgen';
import { IFlow, ElementType } from '../store/flow.types';
import { Action } from '@ngrx/store';
import { type, createActionTypeChecker } from './utils';

export type SceneAction = ISelectItemAction | INewFlowAction;

export interface INewFlowAction extends Action
{
  payload: IFlow;
}

export interface ISelectItemAction extends Action
{
  payload: { itemId: number }
}

export const sceneActions = {
  NEW_FLOW: type('[Node] New Flow'),
  SELECT_ITEM: type('[Node] Select Item'),
};

export const isSceneAction = createActionTypeChecker<SceneAction>(sceneActions);


@Injectable()
export class SceneActionCreators
{
  newFlow(name: string): INewFlowAction
  {
    const flow: IFlow =
      {
        type: ElementType.Flow,
        name,
        id: newId(),
        ports: [],
        elementLinks: [],
        elements: [],
        portLinks: []
      };

    return { type: sceneActions.NEW_FLOW, payload: flow };
  }

  selectItem(itemId: number): ISelectItemAction
  {
    return { type: sceneActions.SELECT_ITEM, payload: { itemId } };
  }
}