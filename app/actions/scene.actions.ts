import {Injectable} from '@angular/core';
import {NgRedux} from 'ng2-redux';
import {IAppState} from '../store/store';
import {INode} from '../store/node.types';
import {newId} from './idgen';
import {Action} from 'redux';

export type ISceneAction = INewNodeAction | ISelectNodeAction;

export interface INewNodeAction extends Action
{
  node: INode;
}
export interface ISelectNodeAction extends Action
{
  nodeId: number;
}


@Injectable()
export class SceneActions
{
  static readonly NEW_NODE = "NEW_NODE";
  static readonly SELECT_NODE = "SELECT_NODE";

  private static all = [SceneActions.NEW_NODE, SceneActions.SELECT_NODE];

  static isSceneAction(action: {type: string}): action is ISceneAction
  {
    return SceneActions.all.findIndex((t) => t === action.type) >= 0;
  }

  constructor(private ngRedux: NgRedux<IAppState>) {}

  newNode(name: string): void
  {
    const id = newId();
    const newNode: INode =
            {
              name,
              id,
              ports: [],
            };

    const action: INewNodeAction =
            {
              type: SceneActions.NEW_NODE,
              node: newNode,
            };


    this.ngRedux.dispatch<INewNodeAction>(action);
  }

  selectNode(nodeId: number): void
  {
    this.ngRedux.dispatch<ISelectNodeAction>(
      {
        type: SceneActions.SELECT_NODE,
        nodeId
      });
  }
}