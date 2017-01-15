import { IElementLayout } from '../../services/layout.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { INodeViewState } from './nodeViewState';
import { IPort } from '../../store/flow.types';

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
  @Output() elementClick = new EventEmitter<number>();

  @Input()
  public layout: IElementLayout = null;

  @Input()
  public viewState: INodeViewState<any> = null;
}
