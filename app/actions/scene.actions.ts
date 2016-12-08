import {Injectable} from '@angular/core';
import {NgRedux} from 'ng2-redux';
import {IAppState} from '../store/store';
import {INode, IPort, IPortRecord} from '../store/scene.types';
import {List} from 'immutable';

export type SceneAction = INewNodeAction | INewPortAction | ISelectNodeAction;

let incrementalId: number = 1;

export class INewNodeAction
{
  type: 'NEW_NODE';
  node: INode;
}

export class INewPortAction
{
  type: 'NEW_PORT';

  port: IPort;
  isInput: boolean;
  nodeId: number;
}

export class ISelectNodeAction
{
  type: 'SELECT_NODE';

  nodeId: number;
}

@Injectable()
export class SceneActions
{
  constructor(private ngRedux: NgRedux<IAppState>) {}

  newNode(name: string): void
  {
    const id = incrementalId++;
    const newNode: INode =
            {
              name: name + id.toString(),
              id,
              inputs: List<IPortRecord>(),
              outputs: List<IPortRecord>(),
            };

    this.ngRedux.dispatch<INewNodeAction>( {type:'NEW_NODE', node:newNode});
  }

  newPort(portName: string, isInput:boolean, node: INode): void
  {
    const id = incrementalId++;
    const port: IPort = {name: portName + id.toString(), id};
    this.ngRedux.dispatch<INewPortAction>({type:'NEW_PORT', port, isInput, nodeId: node.id});
  }

  selectNode(nodeId:number): void
  {
    this.ngRedux.dispatch<ISelectNodeAction>({type:'SELECT_NODE', nodeId});
  }
}