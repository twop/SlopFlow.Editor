import {Component, OnInit} from "@angular/core";
import {NgRedux} from 'ng2-redux';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import {INodeLayout, RLayoutService} from '../../services/layout.service';
import {Point} from '../../geometry/point';
import {Toolbar, ToolbarItem, ToolbarIcons} from '../../Scene/toolbar';
import {NodeActions} from '../../actions/node.actions';
import {StateWithHistory} from 'redux-undo';
import {UserStoryService} from '../../services/userStory.service';
import {IAppState} from '../../store/store';
import {INode} from '../../store/node.types';

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
          <g node-rworkspace [layout]="layout | async"/>
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
  {}

  private readonly position = new Point(20, 20);
  layout: Observable<INodeLayout> = null;
  name: Observable<string> = null;
  toolbar: Observable<Toolbar> = null;

  ngOnInit(): void
  {
    const node: Observable<StateWithHistory<INode>> = this.ngRedux
      .select((state: IAppState) => state.scene.nodes.find( nHistory => nHistory.present.id  == state.scene.selected))
      .filter(node => node != null);

    this.name = node.map(node => node.present.name);
    this.layout = node.map(node => this.layoutService.buildNodeLayout(node.present, this.position));
    this.toolbar = node.map(node => this.buildToolbar(node));

    this.layout.subscribe(layout => console.log(`layout: ${layout.node.name}`));
  }

  private buildToolbar(node: StateWithHistory<INode>): Toolbar
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
      () => this.actions.undo( node.present.id),
      ToolbarIcons.undo,
      ()=> node.past.length>0);

    const redo = new ToolbarItem(
      'redo',
      () => this.actions.redo( node.present.id),
      ToolbarIcons.redo,
      ()=> node.future.length>0);

    return new Toolbar(node.present.name, newPort, rename, undo, redo);
  }
}
