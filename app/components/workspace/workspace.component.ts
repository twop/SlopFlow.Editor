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
import { UserStoryService } from '../../services/userStory.service';
import { IAppState } from '../../store/store';
import { INode } from '../../store/node.types';
import { IFlow } from '../../store/flow.types';

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
          <g node-rworkspace [layout]="nodeLayout | async"/>
          <g flow-rworkspace [layout]="flowLayout | async"/>
        </svg>
      </div>
    </div>`
})

export class RWorkspaceComponent implements OnInit
{
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private actions: NodeActions,
    private layoutService: RLayoutService,
    private userStoryService: UserStoryService)
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

    this.toolbar = node$.map(node => this.buildNodeToolbar(node));

    //this.nodeLayout.subscribe(layout => console.log(`layout: ${layout.name}`));
  }

  private buildNodeToolbar(node: StateWithHistory<INode>): Toolbar
  {
    const newPort = new ToolbarItem(
      'port',
      () => this.userStoryService.createPort(node.present.id),
      ToolbarIcons.addNew);

    const rename = new ToolbarItem(
      'rename',
      () => this.userStoryService.renameNode(node.present),
      ToolbarIcons.edit);

    const undo = new ToolbarItem(
      'undo',
      () => this.actions.undo(node.present.id),
      ToolbarIcons.undo,
      () => node.past.length > 0);

    const redo = new ToolbarItem(
      'redo',
      () => this.actions.redo(node.present.id),
      ToolbarIcons.redo,
      () => node.future.length > 0);

    return new Toolbar(node.present.name, newPort, rename, undo, redo);
  }

  private buildFlowToolbar(flow: StateWithHistory<IFlow>): Toolbar
  {
    const newPort = new ToolbarItem(
      'port',
      () => this.userStoryService.createPort(flow.present.id),
      ToolbarIcons.addNew);

    const rename = new ToolbarItem(
      'rename',
      () => this.userStoryService.renameNode(flow.present),
      ToolbarIcons.edit);

    const undo = new ToolbarItem(
      'undo',
      () => this.actions.undo(flow.present.id),
      ToolbarIcons.undo,
      () => flow.past.length > 0);

    const redo = new ToolbarItem(
      'redo',
      () => this.actions.redo(flow.present.id),
      ToolbarIcons.redo,
      () => flow.future.length > 0);

    return new Toolbar(flow.present.name, newPort, rename, undo, redo);
  }
}
