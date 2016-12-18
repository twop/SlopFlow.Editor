import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

import {SceneActions} from '../../actions/scene.actions';
import {NgRedux} from 'ng2-redux';
import {IAppState} from '../../store/store';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import {StateWithHistory} from 'redux-undo';
import {UserStoryService} from '../../services/userStory.service';
import {INode} from '../../store/node.types';
import { IFlow } from '../../store/flow.types';

@Component({
  selector: 'r-assets',
  templateUrl: 'app/components/assets/assets.component.html',
  styleUrls: ['app/components/assets/assets.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RAssetsComponent implements OnInit
{
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private actions: SceneActions,
    private userStoryService: UserStoryService)
  {}

  nodes: Observable<Array<StateWithHistory<INode>>> = null;
  flows: Observable<Array<StateWithHistory<IFlow>>> = null;
  selectedId: Observable<number> = null;

  ngOnInit(): void
  {
    this.nodes = this.ngRedux.select((state: IAppState) => state.scene.nodes);
    this.flows = this.ngRedux.select((state: IAppState) => state.scene.flows);

    this.selectedId = this.ngRedux.select((state: IAppState) => state.scene.selected);
  }

  selectNode(node: INode)
  {
    this.actions.selectItem(node.id);
  }

  selectFlow(flow: IFlow)
  {
    this.actions.selectItem(flow.id);
  }

  requestNewNode(): void
  {
    this.userStoryService.createNode();
  }

  requestNewFlow(): void
  {
    this.userStoryService.createFlow();
  }
}