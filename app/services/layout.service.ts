import {Injectable} from '@angular/core';
import {Point} from '../geometry/point';
import {Rectangle} from '../geometry/rectangle';
import {INode, IPort, PortType} from '../store/node.types';
import {IElementLink, IFlow, IFlowElement} from '../store/flow.types';
import {type} from 'os';

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
  portsGap = 20;
}

@Injectable()
export class LayoutService
{
  private readonly nodeSizes = new Sizes();

  public buildNodeLayout = (node: INode, atPosition: Point): INodeLayout =>
  {
    const maxPortsOnSide = Math.max(countType(node.ports, PortType.Input), countType(node.ports, PortType.Output));
    const nodeHeight = (maxPortsOnSide + 1) * this.nodeSizes.portsGap + maxPortsOnSide * this.nodeSizes.portSize;

    return this.layoutElement(node.id, node.name, node.ports, atPosition, nodeHeight, this.nodeSizes);
  };

  public buildFlowLayout(flow: IFlow): IFlowLayout
  {
    const nodeLayouts: Array<INodeLayout> = flow.elements.map(node => this.buildNodeLayout(node, node.position));

    const linkLayouts: Array<ILinkLayout> = [];

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

    let layout: INodeLayout = this.layoutElement(flow.id, flow.name, flow.ports, rect.topLeft, rect.height, sizes);

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

  private layoutElement(id: number, name: string, ports: IPort[], offset: Point, height: number, sizes: Sizes): INodeLayout
  {
    const rect = new Rectangle(offset.x, offset.y + sizes.nodeNameOffset, sizes.nodeDefaultWidth, height);
    const portLayouts: Array<IPortLayout> = this.layoutPorts(ports, rect, sizes);

    return {
      id,
      name,
      rect: rect,
      nodeNameOffset: sizes.nodeNameOffset,
      portNameOffset: sizes.portNameOffset,
      portLayouts: portLayouts
    };
  }

  private layoutPorts(ports: Array<IPort>, rect: Rectangle, sizes: Sizes): Array<IPortLayout>
  {
    if (ports.length == 0) return [];

    const halfPortSize = sizes.portSize / 2;

    const createMapper = (portType: PortType, x: number) =>
    {
      const gap = rect.height / (countType(ports, portType) + 1);
      let startY = rect.y + gap - halfPortSize;

      return (port: IPort): IPortLayout =>
      {
        const portRect = new Rectangle(x -  halfPortSize, startY, sizes.portSize, sizes.portSize);
        startY += gap;
        return {port, rect: portRect};
      };
    };

    const inputsMapper = createMapper(PortType.Input, rect.x);
    const outputsMapper = createMapper(PortType.Output, rect.right);
    return ports.map(port => port.type == PortType.Input ? inputsMapper(port) : outputsMapper(port));
  }
}

const countType = (ports:IPort[], portType: PortType) : number => ports.reduce((state, port) => port.type === portType ? ++state : state, 0);