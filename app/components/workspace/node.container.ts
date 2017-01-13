import { Point } from '../../geometry/point';
import { NodeActionCreators } from '../../actions/node.actions';
import { Action, Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import '@ngrx/core/add/operator/select';

import { INodeLayout, LayoutService } from '../../services/layout.service';
import { Toolbar, buildNodeToolbar } from '../../services/toolbar';
import { StoreObservablesService } from '../../services/storeObservables.service';
import { IAppState } from '../../store/store';
import { DialogService } from '../../services/dialog.service';
import { ActivatedRoute } from '@angular/router';
import { SceneActionCreators } from '../../actions/scene.actions';


@Component({
  styleUrls: [`app/components/workspace/workspace.css`],
  template: `
  <span class="my-panel-header">{{name$ | async}}</span>
    <toolbar *ngIf="toolbar$ | async" [toolbar]="toolbar$ | async"></toolbar>
    <context-toolbar></context-toolbar>
    <svg xlink="http://www.w3.org/1999/xlink" height="500" width="600" class='img-fluid svg'>
      <g *ngIf="layout$ | async" node-workspace [layout]="layout$ | async"/>
    </svg>
  `
})
export class NodeContainer implements OnDestroy
{
  layout$: Observable<INodeLayout> = null;
  name$: Observable<string> = null;
  toolbar$: Observable<Toolbar> = null;

  private actionsSubscription: Subscription;

  constructor(
    {node$, nodeHistory$}: StoreObservablesService,
    store: Store<IAppState>,
    actions: NodeActionCreators,
    sceneAction: SceneActionCreators,
    layoutService: LayoutService,
    dialogs: DialogService,
    route: ActivatedRoute)
  {
    this.actionsSubscription = route.params
      .select<string>('id')
      .map(id => sceneAction.selectItem(+id))
      .subscribe(store);

    const offset = new Point(20, 20);
    this.layout$ = node$.map(n => n && layoutService.buildNodeLayout(n, offset));
    this.name$ = node$.map(n => n && n.name);

    const dispatch = (action: Action) => store.dispatch(action);
    this.toolbar$ = nodeHistory$.map(nh => nh && buildNodeToolbar(nh, dialogs, dispatch, actions));
  }

  ngOnDestroy()
  {
    this.actionsSubscription.unsubscribe();
  }
}