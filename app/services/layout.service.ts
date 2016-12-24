import { Injectable } from '@angular/core';
import { Point } from '../geometry/point';
import { Rectangle } from '../geometry/rectangle';
import { INode, IPort, PortType } from '../store/node.types';
import { IElementLink, IFlow, IFlowElement } from '../store/flow.types';

export interface INodeLayout
{
  readonly id: number;
  readonly name: string;
  readonly rect: Rectangle;

  readonly nodeNameOffset: number;
  readonly portNameOffset: number;

  readonly portLayouts: IPortLayout[];
}

export interface IPortLayout
{
  readonly port: IPort;
  readonly rect: Rectangle;
}

export interface IFlowLayout
{
  readonly rect: Rectangle;

  readonly nodeLayouts: INodeLayout[];
  readonly linkLayouts: ILinkLayout[];

  readonly portNameOffset: number;
  readonly portLayouts: IPortLayout[];
}

export interface ILinkLayout
{
  readonly link: IElementLink;
  readonly from: Point;
  readonly to: Point;
  readonly path: string
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
    // TODO make it mem efficient. Avoid allocating another array
    const inputs: Array<IPort> = node.ports.filter(p => p.type === PortType.Input);
    const outputs: Array<IPort> = node.ports.filter(p => p.type === PortType.Output);

    const maxPortsOnSide = Math.max(inputs.length, outputs.length);
    const nodeHeight = (maxPortsOnSide + 1) * this.nodeSizes.portsDistance + maxPortsOnSide * this.nodeSizes.portSize;

    return this.layoutElement(node.id, node.name, inputs, outputs, atPosition, nodeHeight, this.nodeSizes);
  };

  public buildFlowLayout(flow: IFlow): IFlowLayout
  {
    const nodeLayouts: Array<INodeLayout> = [];
    const linkLayouts: Array<ILinkLayout> = [];

    flow.elements.forEach(node => nodeLayouts.push(this.buildNodeLayout(node, node.position)));

    for (const link of flow.elementLinks)
    {
      const fromPoint: Point = this.getPortCenter(nodeLayouts, link.fromElementId, link.fromElementPortId);
      const toPoint: Point = this.getPortCenter(nodeLayouts, link.toElementId, link.toElementPortId);

      linkLayouts.push(
        {
          link: link,
          from: fromPoint,
          to: toPoint,
          path: `M ${fromPoint.x} ${fromPoint.y} C ${fromPoint.x + 50} ${fromPoint.y} ${toPoint.x - 50} ${toPoint.y} ${toPoint.x} ${toPoint.y}`,
        });
    }

    const rect = nodeLayouts.length ? nodeLayouts[0].rect.clone() : new Rectangle(0, 0, 0, 0);
    nodeLayouts.forEach(nl => rect.unionInPlace(nl.rect));
    rect.inflate(20, 20);

    let sizes = new Sizes;
    sizes.nodeDefaultWidth = rect.width;
    sizes.nodeNameOffset = 0;

  // TODO make it mem efficient. Avoid allocating another array
    const inputs: IPort[] = flow.ports.filter(p => p.type === PortType.Input);
    const outputs: IPort[] = flow.ports.filter(p => p.type === PortType.Output);

    let layout: INodeLayout = this.layoutElement(flow.id, flow.name, inputs, outputs, rect.topLeft, rect.height, sizes);

    return {
      nodeLayouts,
      linkLayouts,
      rect,
      portLayouts: layout.portLayouts,
      portNameOffset: sizes.portNameOffset,
    };
  }

  private getPortCenter(nodeLayouts: Array<INodeLayout>, elementId: number, portId: number): Point
  {
    const fromLayout: INodeLayout = nodeLayouts.find(l => l.id == elementId);
    const portLayout: IPortLayout = fromLayout.portLayouts.find(pl => pl.port.id == portId);
    return portLayout.rect.center;
  }

  private layoutElement(id: number, name:string, inputs: IPort[], outputs: IPort[], offset: Point, height: number, sizes: Sizes): INodeLayout
  {
    const rect = new Rectangle(offset.x, offset.y + sizes.nodeNameOffset, sizes.nodeDefaultWidth, height);

    const portLayouts: Array<IPortLayout> = this.layoutPorts(inputs, rect.y, rect.x, rect.height, sizes);
    portLayouts.push(...this.layoutPorts(outputs, rect.y, rect.right, rect.height, sizes));

    return {
      id,
      name,
      rect: rect,
      nodeNameOffset: sizes.nodeNameOffset,
      portNameOffset: sizes.portNameOffset,
      portLayouts: portLayouts
    };
  }

  private layoutPorts(ports: Array<IPort>, top: number, x: number, height: number, sizes: Sizes): Array<IPortLayout>
  {
    if (ports.length == 0) return [];

    let distance = height / (ports.length + 1);
    let startY = top + distance - sizes.portSize / 2;

    const createLayout = (port: IPort): IPortLayout =>
    {
      const rect = new Rectangle(x - sizes.portSize / 2, startY, sizes.portSize, sizes.portSize);
      startY += sizes.portsDistance + sizes.portSize;
      return { port: port, rect: rect };
    };

    return ports.map(port => createLayout(port));
  }
}