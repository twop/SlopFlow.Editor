import { ActivatedRoute } from '@angular/router';
import { go } from '@ngrx/router-store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { SceneActionCreators } from '../../actions/scene.actions';
import { IAppState } from '../../store/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { INode } from '../../store/node.types';
import { IFlow } from '../../store/flow.types';
import { DialogService } from '../../services/dialog.service';
import { Store } from '@ngrx/store';
import { History } from '../../store/undoable';

@Component({
  selector: 'assets',
  templateUrl: 'app/components/assets/assets.component.html',
  styleUrls: ['app/components/assets/assets.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AssetsComponent implements OnInit
{
  constructor(
    private store: Store<IAppState>,
    private actions: SceneActionCreators,
    private dialogs: DialogService,
    private route: ActivatedRoute)
  { }

  nodes: Observable<Array<History<INode>>> = null;
  flows: Observable<Array<History<IFlow>>> = null;
  selectedId: Observable<number> = null;

  ngOnInit(): void
  {
    this.nodes = this.store.select((state: IAppState) => state.scene.nodes);
    this.flows = this.store.select((state: IAppState) => state.scene.flows);

    this.selectedId = this.store.select((state: IAppState) => state.scene.selected);
  }

  selectNode(node: INode)
  {
    this.store.dispatch(go(["workspace/node", node.id]))
    //this.store.dispatch(this.actions.selectItem(node.id));
  }

  selectFlow(flow: IFlow)
  {
    this.store.dispatch(go(["workspace/flow", flow.id]))
    //this.store.dispatch(this.actions.selectItem(flow.id));
  }

  requestNewNode(): void
  {
    this.dialogs.createNode((name: string) => 
    {
      const action = this.actions.newNode(name);
      this.store.dispatch(action);
      this.store.dispatch(go(["workspace/node", action.payload.id]))
    });
  }

  requestNewFlow(): void
  {
    this.dialogs.createFlow((name: string) => 
    {
      const action = this.actions.newFlow(name);
      this.store.dispatch(action);
      this.store.dispatch(go(["workspace/flow", action.payload.id]))
    });
  }
}