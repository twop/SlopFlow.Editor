import {Injectable} from '@angular/core';
import {NgRedux} from 'ng2-redux';
import {IAppState} from '../store/store';
import {INode} from '../store/scene.types';

export type SceneAction = INewNodeAction;

let incrementalId: number = 1;

export interface INewNodeAction
{
  type: 'NEW_NODE';
  node: INode;
}

@Injectable()
export class SceneActions
{
  constructor(private ngRedux: NgRedux<IAppState>) {}

  newNode(name: string): void
  {
    const newNode: INode = {name, id: incrementalId++};
    this.ngRedux.dispatch<INewNodeAction>({type: 'NEW_NODE', node: newNode});
  }
}