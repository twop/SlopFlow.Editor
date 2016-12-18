import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/store';
import { INode } from '../store/node.types';
import { newId } from './idgen';
import { Action } from 'redux';
import { IFlow } from '../store/flow.types';

export type ISceneAction = INewNodeAction | ISelectItemAction | INewFlowAction;

export interface INewFlowAction extends Action
{
  flow: IFlow;
}

export interface INewNodeAction extends Action
{
  node: INode;
}

export interface ISelectItemAction extends Action
{
  itemId: number;
}

@Injectable()
export class SceneActions
{
  static readonly NEW_NODE = "NEW_NODE";
  static readonly SELECT_ITEM = "SELECT_ITEM";
  static readonly NEW_FLOW = 'NEW_FLOW';

  private static all = [SceneActions.NEW_NODE, SceneActions.SELECT_ITEM, SceneActions.NEW_FLOW];

  static isSceneAction(action: { type: string }): action is ISceneAction
  {
    return SceneActions.all.findIndex((t) => t === action.type) >= 0;
  }

  constructor(private ngRedux: NgRedux<IAppState>) { }

  newNode(name: string): void
  {
    const node: INode =
      {
        name,
        id: newId(),
        ports: [],
      };

    this.ngRedux.dispatch<INewNodeAction>({ type: SceneActions.NEW_NODE, node});
  }

  newFlow(name: string): void
  {
    const flow: IFlow =
            {
              name,
              id: newId(),
              ports: [],
              elementLinks: [],
              elements: [],
              portLinks: []
            };

    this.ngRedux.dispatch<INewFlowAction>({ type: SceneActions.NEW_FLOW, flow});
  }

  selectItem(itemId: number): void
  {
    this.ngRedux.dispatch<ISelectItemAction>(
      {
        type: SceneActions.SELECT_ITEM,
        itemId
      });
  }
}