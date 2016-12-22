import { Component, OnInit } from "@angular/core";
import { NgRedux } from 'ng2-redux';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/merge'

import { INodeLayout, RLayoutService, IFlowLayout } from '../../services/layout.service';
import { Point } from '../../geometry/point';
import { Toolbar, ToolbarItem, ToolbarIcons } from '../../Scene/toolbar';
import { NodeActions } from '../../actions/node.actions';
import { StateWithHistory } from 'redux-undo';
import { DialogService } from '../../services/dialog.service';
import { IAppState } from '../../store/store';
import { INode } from '../../store/node.types';
import { IFlow } from '../../store/flow.types';
import { IPortModel } from '../../dialogs/portDialog.component';
import { FlowActions } from '../../actions/flow.actions';
import { newId } from '../../actions/idgen';

@Component({
  selector: `r-workspace`,
  styleUrls: [`app/components/workspace/workspace.css`],
  template: `
    <div class="card card-block">
      <div class="">
        <span class="my-panel-header">{{name | async}}</span>
        <toolbar *ngIf="toolbar | async" [toolbar]="toolbar | async"></toolbar>
      </div>
      <div class="">
        <!--<context-toolbar></context-toolbar>-->
        <svg xlink="http://www.w3.org/1999/xlink" height="500" width="600" class='img-fluid svg'>
          <g *ngIf="nodeLayout | async" node-rworkspace [layout]="nodeLayout | async"/>
          <g *ngIf="flowLayout | async" flow-rworkspace [layout]="flowLayout | async"/>
        </svg>
      </div>
    </div>`
})

export class RWorkspaceComponent implements OnInit
{
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private nodeActions: NodeActions,
    private flowActions: FlowActions,
    private layoutService: RLayoutService,
    private dialogs: DialogService)
  { } 

  private readonly position = new Point(20, 20);
  nodeLayout: Observable<INodeLayout> = null;
  flowLayout: Observable<IFlowLayout> = null;
  name: Observable<string> = null;
  toolbar: Observable<Toolbar> = null;

  ngOnInit(): void
  {
    const node$: Observable<StateWithHistory<INode>> = this.ngRedux
      .select((state: IAppState) => state.scene.nodes.find(nh => nh.present.id == state.scene.selected))
      .filter(nh => nh != null);

    const flow$: Observable<StateWithHistory<IFlow>> = this.ngRedux
      .select((state: IAppState) => state.scene.flows.find(fh => fh.present.id == state.scene.selected))
      .filter(flow => flow != null);

    this.nodeLayout = node$.map(nh => this.layoutService.buildNodeLayout(nh.present, this.position));
    this.flowLayout = flow$.map(fh => this.layoutService.buildFlowLayout(fh.present));

    this.name = node$
      .map(nh => nh.present.name)
      .merge(flow$.map(fh => fh.present.name));

    this.toolbar = node$
    .map(node => this.buildNodeToolbar(node))
    .merge(flow$.map(flow => this.buildFlowToolbar(flow)));
  }

  private buildNodeToolbar(node: StateWithHistory<INode>): Toolbar
  {
    const nodeId = node.present.id;
    const nodeName = node.present.name;

    const newPort = new ToolbarItem(
      'port',
      () => this.dialogs.createPort((model: IPortModel) => this.nodeActions.newPort(model, nodeId)),
      ToolbarIcons.addNew);

    const rename = new ToolbarItem(
      'rename',
      () => this.dialogs.renameNode(nodeName, (newName: string) => this.nodeActions.rename(nodeId, newName)),
      ToolbarIcons.edit);

    const undo = new ToolbarItem(
      'undo',
      () => this.nodeActions.undo(nodeId),
      ToolbarIcons.undo,
      () => node.past.length > 0);

      const redo = new ToolbarItem(
      'redo',
      () => this.nodeActions.redo(nodeId),
      ToolbarIcons.redo,
      () => node.future.length > 0);

    return new Toolbar(node.present.name, newPort, rename, undo, redo);
  }

  private buildFlowToolbar(flow: StateWithHistory<IFlow>): Toolbar
  {
    const flowId = flow.present.id;
    const flowName = flow.present.name;

    const newPort = new ToolbarItem(
      'port',
      () => this.dialogs.createPort((model: IPortModel) => this.flowActions.newPort(model, flowId)),
      ToolbarIcons.addNew);

    const rename = new ToolbarItem(
      'rename',
      () => this.dialogs.renameNode(flowName, (newName: string) => this.flowActions.rename(flowId, newName)),
      ToolbarIcons.edit);

    const undo = new ToolbarItem(
      'undo',
      () => this.flowActions.undo(flowId),
      ToolbarIcons.undo,
      () => flow.past.length > 0);

    const redo = new ToolbarItem(
      'redo',
      () => this.flowActions.redo(flowId),
      ToolbarIcons.redo,
      () => flow.future.length > 0);

    return new Toolbar(flowName, newPort, rename, undo, redo);
  }
}
