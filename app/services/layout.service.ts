import { Injectable } from '@angular/core';
import { Point } from '../geometry/point';
import { Rectangle } from '../geometry/rectangle';
import { IElementLink, IFlow, IFlowElement, IPort, PortType } from '../store/flow.types';

export interface IElementLayout
{
  readonly id: number;
  readonly name: string;
  readonly rect: Rectangle;

  readonly elemNameOffset: number;
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
  readonly flowId: number
  readonly rect: Rectangle;

  readonly elementLayouts: IElementLayout[];
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

const sizes = {
  elemNameOffset: 8,
  portNameOffset: 4,

  elemWidth: 100,

  portSize: 15,
  portsGap: 20,
};

export function moveLayout(layout: IElementLayout, newPosition:Point)
{
  const delta:Point = newPosition.copy().subtract(layout.rect.topLeft);

  layout.rect.moveBy(delta);

  for (const port of layout.portLayouts)
  {
    port.rect.moveBy(delta);
  }
}

@Injectable()
export class LayoutService
{
  public buildFlowLayout(flow: IFlow): IFlowLayout
  {
    const elementLayouts: IElementLayout[] = flow.elements.map(elem => layoutElement(elem, elem.position));
    const linkLayouts: ILinkLayout[] = flow.elementLinks.map(link => layoutLink(link, elementLayouts));

    const rect = new Rectangle( 40, 40, sizes.elemWidth, getElemHeight(flow.ports));

    return {
      flowId: flow.id,
      elementLayouts,
      linkLayouts,
      rect,
      portLayouts: layoutPorts(flow.ports, rect, sizes.portSize),
      portNameOffset: sizes.portNameOffset,
    };
  }
}

function getElemHeight(ports: IPort[], portsGap:number = sizes.portsGap, portSize:number = sizes.portSize) : number
{
  const maxPortsOnSide = Math.max(countType(ports, PortType.Input), countType(ports, PortType.Output));
  const height = (maxPortsOnSide + 1) * portsGap + maxPortsOnSide * portSize;
  return height;
}

function layoutElement({id, name, ports}: IFlowElement, offset: Point): IElementLayout
{
  const {elemNameOffset, portNameOffset, elemWidth, portSize} = sizes;

  const rect = new Rectangle(offset.x, offset.y, elemWidth, getElemHeight(ports));

  return {
    id,
    name,
    rect,
    elemNameOffset,
    portNameOffset,
    portLayouts: layoutPorts(ports, rect, portSize)
  };
}


function layoutPorts(ports: IPort[], rect: Rectangle, portSize: number): IPortLayout[]
{
  if (ports.length == 0) return [];

  const halfPortSize = portSize / 2;

  const createMapper = (portType: PortType, x: number) =>
  {
    const gap = rect.height / (countType(ports, portType) + 1);
    let startY = rect.y + gap - halfPortSize;

    return (port: IPort): IPortLayout =>
    {
      const portRect = new Rectangle(x - halfPortSize, startY, portSize, portSize);
      startY += gap;
      return { port, rect: portRect };
    };
  };

  const inputsMapper = createMapper(PortType.Input, rect.x);
  const outputsMapper = createMapper(PortType.Output, rect.right);
  return ports.map(port => port.type == PortType.Input ? inputsMapper(port) : outputsMapper(port));
}

function layoutLink(link: IElementLink, elementLayouts: IElementLayout[]): ILinkLayout
{
  function getPortCenter(elementId: number, portId: number): Point
  {
    const fromLayout: IElementLayout = elementLayouts.find(l => l.id == elementId);
    const portLayout: IPortLayout = fromLayout.portLayouts.find(pl => pl.port.id == portId);
    return portLayout.rect.center;
  }

  const fromPoint: Point = getPortCenter(link.fromElementId, link.fromElementPortId);
  const toPoint: Point = getPortCenter(link.toElementId, link.toElementPortId);

  return {
    link,
    from: fromPoint,
    to: toPoint,
    path: `M ${fromPoint.x} ${fromPoint.y} C ${fromPoint.x + 50} ${fromPoint.y} ${toPoint.x - 50} ${toPoint.y} ${toPoint.x} ${toPoint.y}`,
  };
}

const countType = (ports: IPort[], portType: PortType): number => ports.reduce((state, port) => port.type === portType ? ++state : state, 0);