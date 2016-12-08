import {Component, Input, Output, EventEmitter} from '@angular/core';
import {INodeLayout} from '../../Scene/layout.service';
import {INodeViewState} from '../../WorkspaceComponent/nodeViewState';
import {IPort, INode} from '../../store/scene.types';

@Component({
  selector: 'g[node-rcomponent]',
  styleUrls: [`app/components/workspace/workspace.css`],
  templateUrl: 'app/components/workspace/node.component.html'
})
export class RNodeComponent
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
