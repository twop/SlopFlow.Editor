import {Component, Input, Output, EventEmitter} from '@angular/core';
import {INode} from '../Model/nodeInterface';
import {IPort} from '../Model/port';
import {Point} from '../Geometry/point';

@Component({
  moduleId: module.id,
  selector: 'g[node-component]',
  styleUrls: ['node.component.css'],
  templateUrl: 'node.component.html'
})
export class NodeComponent
{
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
