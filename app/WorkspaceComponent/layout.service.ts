import {Injectable} from '@angular/core';
import {Point} from '../Geometry/point';
import {IPort} from '../Model/port';
import {INode} from '../Model/nodeInterface';
import {Rectangle} from '../Geometry/rectangle';

export interface INodeLayout
{
  node: INode;
  rect:Rectangle;

  nodeNameOffset:number;
  portNameOffset:number;

  [Symbol.iterator]():IterableIterator<IPortLayout>;
}

export interface IPortLayout
{
  port: IPort;
  rect: Rectangle;
}

@Injectable()
export class LayoutService
{
  public getNodeLayout = (node: INode, atPosition: Point): INodeLayout => new NodeLayout(node, atPosition);
}

function* generatePortLayouts(nodeLayout:NodeLayout)
{
  for (var i = 0; i < nodeLayout.node.inputs.length; i++)
  {
    yield nodeLayout.createPortLayout(nodeLayout.node.inputs[i], i, nodeLayout.rect.x);
  }

  for (var i = 0; i < nodeLayout.node.outputs.length; i++)
  {
    yield nodeLayout.createPortLayout(nodeLayout.node.outputs[i], i, nodeLayout.rect.right);
  }
}

class NodeLayout implements INodeLayout
{
  constructor( node: INode, private offset: Point)
  {
    this.node = node;
    this.recalcRect(offset);
  }

  readonly node:INode;

  readonly nodeNameOffset = 8;
  readonly portNameOffset = 4;

  private calculatedRect:Rectangle = null;
  private calculatedWithCount:number = 0;

  public get rect():Rectangle
  {
    if (this.calculatedWithCount != this.maxPortsOnSide)
      this.recalcRect(this.offset);

    return this.calculatedRect;
  }

  private get maxPortsOnSide():number {return Math.max(this.node.inputs.length, this.node.outputs.length);};

  private recalcRect(offset: Point):void
  {
    this.calculatedWithCount = this.maxPortsOnSide;
    const nodeHeight = ( this.calculatedWithCount - 1) * NodeLayout.portSpace + NodeLayout.portSize + NodeLayout.nodeDefaultHeight;
    this.calculatedRect = new Rectangle(offset.x, offset.y + this.nodeNameOffset, NodeLayout.nodeDefaultWidth, nodeHeight)
  }

  [Symbol.iterator] ():IterableIterator<IPortLayout> {return generatePortLayouts(this);};

  public createPortLayout(port: IPort, index: number, x: number): IPortLayout
  {
    return { port: port, rect: this.getPortRect(index, x)};
  };

  private getPortRect (index: number, centerX:number): Rectangle
  {
    const y = this.rect.y + index * NodeLayout.portSpace + NodeLayout.nodeDefaultHeight / 2;
    return new Rectangle(centerX - NodeLayout.portSize / 2, y, NodeLayout.portSize, NodeLayout.portSize);
  }

  private static portSize = 15;
  private static nodeDefaultWidth = 100;

  private static portSpace = 35;
  private static nodeDefaultHeight = 30;
}