import { Injectable } from '@angular/core';
import { IAppState } from '../store/store';
import { INode, ElementType } from '../store/node.types';
import { newId } from './idgen';
import { IFlow } from '../store/flow.types';
import { Action } from '@ngrx/store';
import { type, createActionTypeChecker } from './utils';

export type SceneAction = INewNodeAction | ISelectItemAction | INewFlowAction;

export interface INewFlowAction extends Action
{
  payload: IFlow;
}

export interface INewNodeAction extends Action
{
  payload: INode;
}

export interface ISelectItemAction extends Action
{
  payload: { itemId: number }
}

export const sceneActions = {
  NEW_NODE: type('[Node] New Node'),
  NEW_FLOW: type('[Node] New Flow'),
  SELECT_ITEM: type('[Node] Select Item'),
};

export const isSceneAction = createActionTypeChecker<SceneAction>(sceneActions);


@Injectable()
export class SceneActionCreators
{
  newNode(name: string): INewNodeAction
  {
    const node: INode =
      {
        type: ElementType.Node,
        name,
        id: newId(),
        ports: [],
      };

    return { type: sceneActions.NEW_NODE, payload: node };
  }

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