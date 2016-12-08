import {Component, OnInit} from "@angular/core";
import {SceneActions} from '../../actions/scene.actions';
import {IAppState} from '../../store/store';
import {NgRedux} from 'ng2-redux';
import {INode} from '../../store/scene.types';
import {OrderedMap} from 'immutable';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {INodeLayout, RLayoutService} from '../../services/layout.service';
import {Point} from '../../Geometry/point';
import {Toolbar, ToolbarItem, ToolbarIcons} from '../../Scene/toolbar';


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
    private actions: SceneActions,
    private layoutService: RLayoutService)
  {}

  readonly position = new Point(20, 20);
  layout: Observable<INodeLayout> = null;
  name: Observable<string> = null;
  toolbar: Observable<Toolbar> = null;

  ngOnInit(): void
  {
    const node: Observable<INode> = this.ngRedux
      .select((state: IAppState) => state.scene.nodes.get(state.scene.selected))
      .filter(node => node != null);

    this.name = node.map(node => node.name);
    this.layout = node.map(node => this.layoutService.buildNodeLayout(node, this.position));
    this.toolbar = node.map(node => this.buildToolbar(node));

    this.layout.subscribe(layout => console.log(`layout: ${layout.node.name}`));
  }

  private buildToolbar(node: INode): Toolbar
  {
    const newPortFunc = () => this.actions.newPort('port', true, node);
    return new Toolbar(node.name, new ToolbarItem('port', newPortFunc, ToolbarIcons.addNew))
  }
}
