import {Component, Input, Output, EventEmitter} from '@angular/core';
import {INodeViewState} from './nodeViewState';
import {IPort, INode} from '../../store/node.types';
import {INodeLayout} from '../../services/layout.service';

@Component({
  selector: 'g[node-component]',
  styleUrls: [`app/components/workspace/workspace.css`],
  templateUrl: 'app/components/workspace/node.component.html'
})
export class NodeComponent
{
  constructor()
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
