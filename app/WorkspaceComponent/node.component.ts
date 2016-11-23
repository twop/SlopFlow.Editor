import {Component, Input, Output, EventEmitter} from '@angular/core';
import {INode} from '../Model/nodeInterface';
import {IPort} from '../Model/port';
import {Log} from '../LogComponent/log';
import {INodeLayout, IPortLayout} from '../Scene/layout.service';
import {INodeViewState} from './nodeViewState';

@Component({
  selector: 'g[node-component]',
  styleUrls: ['app/WorkspaceComponent/flowStyles.css'],
  templateUrl: 'app/WorkspaceComponent/node.component.html'
})
export class NodeComponent
{
  constructor(private log:Log)
  {
    //log.warning("NodeComponent ctr");
  }

  @Output() portClick = new EventEmitter<IPort>();
  @Output() nodeClick = new EventEmitter<INode>();

  @Input()
  public layout: INodeLayout = null;

  @Input()
  public viewState:INodeViewState<any> = null;
}
