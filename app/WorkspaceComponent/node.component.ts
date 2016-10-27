import {
  Component, Input, Output, EventEmitter, AfterViewChecked, AfterViewInit, OnChanges,
  SimpleChange, DoCheck, AfterContentInit
} from '@angular/core';
import {INode} from '../Model/nodeInterface';
import {IPort} from '../Model/port';
import {Point} from '../Geometry/point';
import {Log} from '../LogComponent/log';
import {LayoutService, INodeLayout, IPortLayout} from './layout.service';

@Component({
  selector: 'g[node-component]',
  styleUrls: ['app/WorkspaceComponent/node.component.css'],
  templateUrl: 'app/WorkspaceComponent/node.component.html'
})
export class NodeComponent implements OnChanges
{
  constructor(private log:Log, private layoutService:LayoutService)
  {
    log.warning("NodeComponent ctr");
  }

  @Input()
  public node: INode;

  @Input()
  public offset:Point = new Point(0, 0);

  @Output() portClick = new EventEmitter<IPort>();
  @Output() nodeClick = new EventEmitter<INode>();

  public layout: INodeLayout = null;

  public get inputs():IPort[] { return this.node.inputs; }
  public get outputs():IPort[] { return this.node.outputs; }

  private buildLayout():INodeLayout
  {
    this.log.warning("requested layout");
    return this.layoutService.getNodeLayout(this.node, this.offset);
  }

  public ngOnChanges(changes: {[propertyName: string]: SimpleChange}):void
  {
    //    for (let propName in changes)
    //    {
    //      let chng = changes[propName];
    //      let cur  = JSON.stringify(chng.currentValue);
    //      let prev = JSON.stringify(chng.previousValue);
    //      this.log.warning(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    //    }

    this.layout = this.buildLayout();
  }
}
