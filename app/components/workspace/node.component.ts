import { IElementLayout } from '../../services/layout.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { INodeViewState } from './nodeViewState';
import { IPort } from '../../store/flow.types';
import { Point } from '../../geometry/point';

@Component({
  selector: 'g[node-component]',
  styleUrls: [`app/components/workspace/workspace.css`],
  template: 
` <svg:g xmlns:svg="http://www.w3.org/1999/XSL/Transform">
    <svg:text class="nodeHeader svgNonInteractive" text-anchor="middle"
              [attr.y]="layout.rect.y - layout.elemNameOffset"
              [attr.x]="layout.rect.x + layout.rect.width/2">{{layout.name}}
    </svg:text>
    <svg:rect 
              my-draggable 
              (mousedrag)="elementDrag.emit($event)"
              [start]="getTopLeft"
              class="node" [class.svgNonInteractive]="!(viewState&&viewState.nodeIsSelectable)" ry="5"
              (click)="elementClick.emit(layout.flowId)"
              [attr.width]="layout.rect.width"
              [attr.height]="layout.rect.height"
              [attr.x]="layout.rect.x"
              [attr.y]="layout.rect.y">
    </svg:rect>

    <svg:g *ngFor="let portLayout of layout.portLayouts">
      <svg:text class="svgNonInteractive"
                [attr.y]="portLayout.rect.y - layout.portNameOffset"
                [attr.x]="portLayout.rect.x">
        <svg:tspan class="portName">{{portLayout.port.name}}</svg:tspan>
        <!--<svg:tspan class="portType">{{portLayout.port.dataType.name}}</svg:tspan>-->
      </svg:text>
      <svg:rect class="port selected" ry="2"
            (click)="portClick.emit(portLayout.port)"
            [class.selected]="viewState && (portLayout.port == viewState.selectedObject)"
            [attr.width]="portLayout.rect.width"
            [attr.height]="portLayout.rect.height"
            [attr.x]="portLayout.rect.x"
            [attr.y]="portLayout.rect.y">
      </svg:rect>
    </svg:g>
  </svg:g>`
})
export class NodeComponent
{
  constructor()
  {
    //log.warning("NodeComponent ctr");
  }

  getTopLeft = ()=> this.layout.rect.topLeft;

  @Output() portClick = new EventEmitter<IPort>();
  @Output() elementClick = new EventEmitter<number>();
  @Output() elementDrag = new EventEmitter<Point>();

  @Input()
  public layout: IElementLayout = null;

  @Input()
  public viewState: INodeViewState<any> = null;
}
