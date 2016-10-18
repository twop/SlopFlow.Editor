import {
  Component, Input, Output, EventEmitter, AfterViewChecked, AfterViewInit, OnChanges,
  SimpleChange, DoCheck, AfterContentInit
} from '@angular/core';
import {INode} from '../Model/nodeInterface';
import {IPort} from '../Model/port';
import {Point} from '../Geometry/point';
import {Log} from '../LogComponent/log';

@Component({
  selector: 'g[node-component]',
  styleUrls: ['app/WorkspaceComponent/node.component.css'],
  templateUrl: 'app/WorkspaceComponent/node.component.html'
})
export class NodeComponent
{
//  constructor(private log:Log)
//  {
//    log.warning("NodeComponent ctr");
//  }
//
//  ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
//    for (let propName in changes) {
//      let chng = changes[propName];
//      let cur  = JSON.stringify(chng.currentValue);
//      let prev = JSON.stringify(chng.previousValue);
//      this.log.warning(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
//    }
//  }
//
//  ngAfterViewChecked(): void
//  {
//    this.log.warning("ngAfterViewChecked");
//  }
//
//  ngAfterViewInit(): void
//  {
//    this.log.warning("ngAfterViewInit");
//  }
//
//  ngDoCheck(): void
//  {
//    this.log.warning("ngDoCheck");
//  }
//
//  ngAfterContentInit(): void
//  {
//    this.log.warning("ngAfterContentInit");
//  }

  @Input()
  public node: INode;

  @Input()
  public offset:Point = new Point(0, 0);

  @Output() portClick = new EventEmitter<IPort>();
  @Output() nodeClick = new EventEmitter<INode>();

  public get inputs():IPort[] { return this.node.inputs; }
  public get outputs():IPort[] { return this.node.outputs; }

  public get maxPorts():number {return Math.max(this.inputs.length, this.outputs.length);}

  readonly portSize = 15;
  readonly portSpace = 35;

  readonly nodeWidth = 100;
  readonly nodeHeight = 30;

  readonly headerTextSize = 8;
  readonly portTextSize = 4;

  public get rectTop():number {return this.offset.y + this.headerTextSize;}
  public get rectLeft():number {return this.offset.x + this.nodeWidth;}
  public getPortNameY = (i:number): number => this.rectTop + i*this.portSpace + this.nodeHeight/2 - this.portTextSize;
  public getPortY = (i:number): number => this.rectTop + i*this.portSpace + this.nodeHeight/2 ;
}
