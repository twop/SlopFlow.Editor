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

  readonly portLayouts:Array<IPortLayout>;
}

export interface IPortLayout
{
  readonly port: IPort;
  readonly rect: Rectangle;
}

export interface IFlowLayout
{
  readonly rect:Rectangle;

  readonly nodeLayouts:Array<INodeLayout>;
  readonly linkLayouts:Array<ILinkLayout>;

  readonly portLayouts:Array<IPortLayout>;
}

export interface ILinkLayout
{
  readonly link:PortLink;
  readonly from:Point;
  readonly to:Point;
}

class Sizes
{
  nodeNameOffset = 8;
  portNameOffset = 4;

  nodeDefaultWidth = 100;

  portSize = 15;
  portsDistance = 20;
}

@Injectable()
export class LayoutService
{
  private readonly nodeSizes = new Sizes();

  public buildNodeLayout = (node: INode, atPosition: Point): INodeLayout =>
  {
    const maxPortsOnSide = Math.max(node.inputs.length, node.outputs.length);
    const nodeHeight = ( maxPortsOnSide + 1) * this.nodeSizes.portsDistance + maxPortsOnSide *this.nodeSizes.portSize;

    return this.layoutNode(node, atPosition, nodeHeight, this.nodeSizes);
  };

  public buildFlowLayout(flow: Flow): IFlowLayout
  {
    const nodeLayouts: Array<INodeLayout> = [];
    const linkLayouts: Array<ILinkLayout> = [];

    flow.nodes.forEach(node=> nodeLayouts.push( this.buildNodeLayout(node, node.position)));

    for (const link of flow.links)
    {
      linkLayouts.push(
        {
          link:link,
          from:this.getPortCenter(nodeLayouts, link.fromNode, link.fromPort),
          to:this.getPortCenter(nodeLayouts, link.toNode, link.toPort),
        });
    }

    const rect = new Rectangle(0,0,0,0);
    nodeLayouts.forEach(nl=> rect.unionInPlace(nl.rect));
    rect.inflate(20, 20);

    let sizes = new Sizes;
    sizes.nodeDefaultWidth = rect.width;
    sizes.nodeNameOffset = 0;

    let layout:INodeLayout = this.layoutNode(flow, rect.topLeft, rect.height, sizes);

    return {
      nodeLayouts:nodeLayouts,
      linkLayouts:linkLayouts,
      rect:rect,
      portLayouts: layout.portLayouts};
  }

  private getPortCenter(nodeLayouts: Array<INodeLayout>, node: NodeInstance, port: IPort):Point
  {
    const fromLayout: INodeLayout = nodeLayouts.find(l=>l.node == node);
//    return fromLayout.getPortRect(port).center;
    return new Point(0,0);
  }

  private layoutNode(node: INode, offset: Point, height:number, sizes:Sizes):INodeLayout
  {
   const rect = new Rectangle(offset.x, offset.y + sizes.nodeNameOffset, sizes.nodeDefaultWidth, height);

    const portLayouts:Array<IPortLayout> = this.layoutPorts(node.inputs, rect.y, rect.x, rect.height, sizes);
    portLayouts.push(...this.layoutPorts(node.outputs, rect.y, rect.right, rect.height, sizes));

    return {
      node:node,
      rect:rect,
      nodeNameOffset:sizes.nodeNameOffset,
      portNameOffset:sizes.portNameOffset,
      portLayouts:portLayouts};
  }

  private layoutPorts(ports:Array<IPort>, top:number, x:number, height:number, sizes:Sizes):Array<IPortLayout>
  {
    if (ports.length == 0) return [];

    let distance = height/(ports.length + 1);
    let startY = top + distance - sizes.portSize/2;

    const createLayout = (port:IPort): IPortLayout =>
    {
      const rect = new Rectangle(x - sizes.portSize / 2, startY, sizes.portSize, sizes.portSize);
      startY += sizes.portsDistance + sizes.portSize;
      return {port: port, rect: rect};
    };

    return ports.map(port => createLayout(port));
  }

//  public getPortRect (port:IPort): Rectangle
//  {
//    let index = this.node.inputs.findIndex(p => p == port);
//    if (index>=0)
//      return this.getPortRectInternal(index, this.rect.x);
//
//    index = this.node.outputs.findIndex(p => p == port);
//    if (index>=0)
//      return this.getPortRectInternal(index, this.rect.right);
//
//    throw "port is not present in node";
//  }
}