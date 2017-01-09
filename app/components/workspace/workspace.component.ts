import { Component, OnInit } from "@angular/core";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/merge'

import { INodeLayout, LayoutService, IFlowLayout } from '../../services/layout.service';
import { Point } from '../../geometry/point';
import { Toolbar, ToolbarItem, ToolbarIcons } from '../../services/toolbar';
import { NodeActionCreators, NodeAction } from '../../actions/node.actions';
import { StateWithHistory } from 'redux-undo';
import { DialogService } from '../../services/dialog.service';
import { IAppState } from '../../store/store';
import { INode } from '../../store/node.types';
import { IFlow } from '../../store/flow.types';
import { IPortModel } from '../../dialogs/portDialog.component';
import { FlowActionCreators, FlowAction } from '../../actions/flow.actions';
import { Store, Action } from '@ngrx/store';

@Component({
  selector: `workspace`,
  styleUrls: [`app/components/workspace/workspace.css`],
  template: `
    <div class="card card-block">
      <div class="">
        <span class="my-panel-header">{{name | async}}</span>
        <toolbar *ngIf="toolbar | async" [toolbar]="toolbar | async"></toolbar>
      </div>
      <div class="">
        <context-toolbar></context-toolbar>
        <svg xlink="http://www.w3.org/1999/xlink" height="500" width="600" class='img-fluid svg'>
          <g *ngIf="nodeLayout | async" node-workspace [layout]="nodeLayout | async"/>
          <g *ngIf="flowLayout | async" flow-workspace [layout]="flowLayout | async"/>
        </svg>
      </div>
    </div>`
})

export class WorkspaceComponent implements OnInit
{
  constructor(
    private store: Store<IAppState>,
    private nodeActions: NodeActionCreators,
    private flowActions: FlowActionCreators,
    private layoutService: LayoutService,
    private dialogs: DialogService)
  { } 

  private readonly position = new Point(20, 20);
  nodeLayout: Observable<INodeLayout> = null;
  flowLayout: Observable<IFlowLayout> = null;
  name: Observable<string> = null;
  toolbar: Observable<Toolbar> = null;

  ngOnInit(): void
  {
    const node$: Observable<StateWithHistory<INode>> = this.store
      .select((state: IAppState) => state.scene.nodes.find(nh => nh.present.id == state.scene.selected))
      .filter(nh => nh != null);

    const flow$: Observable<StateWithHistory<IFlow>> = this.store
      .select((state: IAppState) => state.scene.flows.find(fh => fh.present.id == state.scene.selected))
      .filter(flow => flow != null);

    this.nodeLayout = node$.map(nh => this.layoutService.buildNodeLayout(nh.present, this.position));
    this.flowLayout = flow$.map(fh => this.layoutService.buildFlowLayout(fh.present));

    this.name = node$
      .map(nh => nh.present.name)
      .merge(flow$.map(fh => fh.present.name));

    const dispatch = (action:Action) => this.store.dispatch(action);

    this.toolbar = node$
    .map(node => this.buildNodeToolbar(node, dispatch, this.nodeActions))
    .merge(flow$.map(flow => this.buildFlowToolbar(flow, dispatch, this.flowActions)));
  }

  private buildNodeToolbar(
    node: StateWithHistory<INode>,
    dispatch:(action: NodeAction)=> void,
    actions: NodeActionCreators): Toolbar
  {
    const nodeId = node.present.id;
    const nodeName = node.present.name;

    const newPort = new ToolbarItem(
      'port',
      () => this.dialogs.createPort((model: IPortModel) => dispatch(actions.newPort(model, nodeId))),
      ToolbarIcons.addNew);

    const rename = new ToolbarItem(
      'rename',
      () => this.dialogs.renameNode(nodeName, (newName: string) => dispatch(actions.rename(nodeId, newName))),
      ToolbarIcons.edit);

    const undo = new ToolbarItem(
      'undo',
      () => dispatch(actions.undo(nodeId)),
      ToolbarIcons.undo,
      () => node.past.length > 0);

      const redo = new ToolbarItem(
      'redo',
      () => dispatch(actions.redo(nodeId)),
      ToolbarIcons.redo,
      () => node.future.length > 0);

    return new Toolbar(node.present.name, newPort, rename, undo, redo);
  }

  private buildFlowToolbar(
    flow: StateWithHistory<IFlow>,
    dispatch:(action: FlowAction)=> void,
    actions: FlowActionCreators): Toolbar
  {
    const flowId = flow.present.id;
    const flowName = flow.present.name;

    const newPort = new ToolbarItem(
      'port',
      () => this.dialogs.createPort((model: IPortModel) => dispatch(actions.newPort(model, flowId))),
      ToolbarIcons.addNew);

    const rename = new ToolbarItem(
      'rename',
      () => this.dialogs.renameNode(flowName, (newName: string) => dispatch(actions.rename(flowId, newName))),
      ToolbarIcons.edit);

    const undo = new ToolbarItem(
      'undo',
      () => dispatch(actions.undo(flowId)),
      ToolbarIcons.undo,
      () => flow.past.length > 0);

    const redo = new ToolbarItem(
      'redo',
      () => dispatch(actions.redo(flowId)),
      ToolbarIcons.redo,
      () => flow.future.length > 0);

    return new Toolbar(flowName, newPort, rename, undo, redo);
  }
}
