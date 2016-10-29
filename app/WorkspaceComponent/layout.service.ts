import {Injectable} from '@angular/core';
import {Point} from '../Geometry/point';
import {IPort} from '../Model/port';
import {INode} from '../Model/nodeInterface';
import {Rectangle} from '../Geometry/rectangle';
import {NodeInstance} from '../Model/nodeInstance';
import {PortLink, Flow} from '../Model/flow';

export interface INodeLayout
{
  readonly node: INode;
  readonly rect:Rectangle;

  readonly nodeNameOffset:number;
  readonly portNameOffset:number;

  [Symbol.iterator]():IterableIterator<IPortLayout>;
}

export interface IPortLayout
{
  readonly port: IPort;
  readonly rect: Rectangle;
}

export interface IFlowLayout
{
  readonly nodeLayouts:Array<INodeLayout>;
  readonly linkLayouts:Array<ILinkLayout>;
}

export interface ILinkLayout
{
  readonly link:PortLink;
  readonly from:Point;
  readonly to:Point;
}

@Injectable()
export class LayoutService
{
  public buildNodeLayout = (node: INode, atPosition: Point): INodeLayout => new NodeLayout(node, atPosition);
  public buildFlowLayout(flow: Flow): IFlowLayout
  {
    const nodeLayouts: Array<NodeLayout> = [];
    const linkLayouts:Array<ILinkLayout> = [];

    flow.nodes.map(node=> nodeLayouts.push(new NodeLayout(node, node.position)));

    for (const link of flow.links)
    {
      linkLayouts.push(
        {
          link:link,
          from:this.getPortCenter(nodeLayouts, link.fromNode, link.fromPort),
          to:this.getPortCenter(nodeLayouts, link.toNode, link.toPort),
        });
    }

    return { nodeLayouts:nodeLayouts, linkLayouts:linkLayouts};
  }

  private getPortCenter(nodeLayouts: Array<NodeLayout>, node: NodeInstance, port: IPort):Point
  {
    const fromLayout: NodeLayout = nodeLayouts.find(l=>l.node == node);
    return fromLayout.getPortRect(port).center;
  }
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
  constructor( public node: INode, public offset: Point)
  {
    this.recalcRect();
  }

  readonly nodeNameOffset = 8;
  readonly portNameOffset = 4;

  private calculatedRect:Rectangle = null;
  private calculatedWithCount:number = 0;

  public get rect():Rectangle
  {
    if (this.calculatedWithCount != this.maxPortsOnSide)
      this.recalcRect();

    return this.calculatedRect;
  }

  private get maxPortsOnSide():number {return Math.max(this.node.inputs.length, this.node.outputs.length);};

  private recalcRect():void
  {
    this.calculatedWithCount = this.maxPortsOnSide;
    const nodeHeight = ( this.calculatedWithCount - 1) * NodeLayout.portSpace + NodeLayout.portSize + NodeLayout.nodeDefaultHeight;
    this.calculatedRect = new Rectangle(this.offset.x, this.offset.y + this.nodeNameOffset, NodeLayout.nodeDefaultWidth, nodeHeight)
  }

  [Symbol.iterator] ():IterableIterator<IPortLayout> {return generatePortLayouts(this);};

  public createPortLayout(port: IPort, index: number, x: number): IPortLayout
  {
    return { port: port, rect: this.getPortRectInternal(index, x)};
  };

  private getPortRectInternal (index: number, centerX:number): Rectangle
  {
    const y = this.rect.y + index * NodeLayout.portSpace + NodeLayout.nodeDefaultHeight / 2;
    return new Rectangle(centerX - NodeLayout.portSize / 2, y, NodeLayout.portSize, NodeLayout.portSize);
  }

  public getPortRect (port:IPort): Rectangle
  {
    let index = this.node.inputs.findIndex(p => p == port);
    if (index>=0)
      return this.getPortRectInternal(index, this.rect.x);

    index = this.node.outputs.findIndex(p => p == port);
    if (index>=0)
      return this.getPortRectInternal(index, this.rect.right);

    throw "port is not present in node";
  }

  private static portSize = 15;
  private static nodeDefaultWidth = 100;

  private static portSpace = 35;
  private static nodeDefaultHeight = 30;
}