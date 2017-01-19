import { sceneActionCreators } from '../../actions/scene.actions';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import '@ngrx/core/add/operator/select';

import { Action, Store } from '@ngrx/store';
import { IAppState } from '../../store/store';
import { flowActionCreators, INewElementAction } from '../../actions/flow.actions';
import { LayoutService, IFlowLayout } from '../../services/layout.service';
import { DialogService } from '../../services/dialog.service';
import { Component, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { StoreObservablesService } from '../../services/storeObservables.service';
import { Toolbar, buildFlowToolbar } from '../../services/toolbar';
import { ActivatedRoute } from '@angular/router';
import { IFlow } from '../../store/flow.types';
import { Point } from '../../geometry/point';



@Component({
  styleUrls: [`app/components/workspace/workspace.css`],
  template: `
    <span class="my-panel-header">{{name$ | async}}</span>
    <toolbar *ngIf="toolbar$ | async" [toolbar]="toolbar$ | async"></toolbar>
    <context-toolbar [toolbar]="contextToolbar$ | async"></context-toolbar>    
    <svg xlink="http://www.w3.org/1999/xlink" height="500" width="600" class='img-fluid svg'>
      <g *ngIf="layout$ | async" flow-workspace [contextToolbar]="contextToolbar$" [layout]="layout$ | async"/>
    </svg>
  `
})
export class FlowContainer implements OnDestroy
{
  layout$: Observable<IFlowLayout> = null;
  name$: Observable<string> = null;
  toolbar$: Observable<Toolbar> = null;
  contextToolbar$: EventEmitter<Toolbar> = new EventEmitter();

  private actionsSubscription: Subscription;

  constructor(
    private store: Store<IAppState>,
    {flow$, flowHistory$}: StoreObservablesService,
    layoutService: LayoutService,
    dialogs: DialogService,
    route: ActivatedRoute)
  {
    this.actionsSubscription = route.params
      .select<string>('id')
      .map(id => sceneActionCreators.selectItem(+id))
      .subscribe(store);

    this.layout$ = flow$.map(f => f && layoutService.buildFlowLayout(f));
    this.name$ = flow$.map(f => f && f.name);


    const dispatch = (action: Action) => store.dispatch(action);
    this.toolbar$ = flowHistory$.map(fh => fh && buildFlowToolbar(fh, dialogs, dispatch));
  }

  ngOnDestroy()
  {
    this.actionsSubscription.unsubscribe();
  }
}