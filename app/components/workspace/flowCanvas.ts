import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Log } from '../../services/log';
import { IElementLayout, IFlowLayout, moveLayout } from '../../services/layout.service';
import { Toolbar, ToolbarItem, ToolbarIcons } from '../../services/toolbar';
import { IPortModel } from '../../dialogs/portDialog.component';
import { flowActionCreators as actions, FlowAction } from '../../actions/flow.actions';
import { DialogService } from '../../services/dialog.service';
import { Store } from '@ngrx/store';
import { IAppState } from '../../store/store';
import { IPort, IFlow } from '../../store/flow.types';
import { INodeViewState } from './nodeViewState';
import { Point } from '../../geometry/point';

@Component({
  selector: 'g[flow-canvas]',
  styleUrls: ['app/components/workspace/workspace.css'],
  template:
  `
  <svg:g xmlns:svg="http://www.w3.org/1999/XSL/Transform">

  <svg:rect class="flowRect" ry="5"
            draggable="true"
            [attr.width]="layout.rect.width"
            [attr.height]="layout.rect.height"
            [attr.x]="layout.rect.x"
            [attr.y]="layout.rect.y"/>

  <svg:g *ngFor="let linkLayout of layout.linkLayouts">
    <svg:path class="portPath"
        [attr.d]="linkLayout.path"/>          
  </svg:g>

  <svg:g *ngFor="let elementLayout of layout.elementLayouts">
    <svg:g 
        node-component 
        [layout]="elementLayout" 
        [viewState]="viewState"
        (elementDrag)="onDrag($event, elementLayout)"
        (elementStartDrag)="onStartDrag($event, elementLayout)"
        (elementDrop)="onElementDropped(elementLayout)"

        (portClick)="onElementPortClicked(elementLayout.id, $event)" 
        (nodeClick)="onElementClicked($event)"/>
  </svg:g>
  <svg:g *ngFor="let portLayout of layout.portLayouts">

     <svg:text class="svgNonInteractive"
              [attr.y]="portLayout.rect.y - layout.portNameOffset"
              [attr.x]="portLayout.rect.x">
      <svg:tspan class="portName">{{portLayout.port.name}}</svg:tspan>
      <!--<svg:tspan class="portType">{{portLayout.port.dataType.name}}</svg:tspan>-->
    </svg:text>

    <svg:circle class="port"
              (click)="onFlowPortClicked(portLayout.port)"
              [attr.r]="portLayout.rect.width/2"
              [attr.cx]="portLayout.rect.center.x"
              [attr.cy]="portLayout.rect.center.y">
    </svg:circle>

  </svg:g>
</svg:g>`
})
export class FlowCanvasComponent
{
  constructor(
    private dialogs: DialogService,
    private store: Store<IAppState>,
    private log: Log
  )
  { }

  viewState: INodeViewState<IFlow> = { nodeIsSelectable: true, selectedObject: null };

  @Input() layout: IFlowLayout = null;
  @Input() contextToolbar: EventEmitter<Toolbar> = null;

  onDrag(point: Point, layout: IElementLayout)
  {
    moveLayout(layout, point);
  }

  onStartDrag(point: Point, layout: IElementLayout)
  {
    console.log("start dragging elem ", layout, point);
  }

  onElementDropped(layout: IElementLayout)
  { 
    this.store.dispatch(actions.moveElement(this.layout.flowId, layout.id, layout.rect.topLeft));
  }

  public onElementPortClicked(elementId: number, port: IPort)
  {
    this.log.debug(`clicked on ${port.name} in element: Id{${elementId}}`);
    //this.contextToolbar$.emit(this.buildPortToolbar(port, this.layout.flowId));
    //this.eventService.requestEditPort.emit( new EditPortRequest(port, this.nodeWorkspace));
  }

  public onFlowPortClicked(port: IPort)
  {
    this.log.debug(`clicked on flow port ${port.name}`);
    this.contextToolbar.emit(this.buildPortToolbar(port, this.layout.flowId));
    //this.eventService.requestEditPort.emit( new EditPortRequest(port, this.nodeWorkspace));
  }

  public onElementClicked(elementId: number)
  {
    this.log.debug(`clicked on element: Id{${elementId}}`);
    //this.eventService.requestEditNode.emit( this.nodeWorkspace);
  }

  public buildPortToolbar(port: IPort, flowId: number): Toolbar
  {
    const dispatch = (action: FlowAction) => this.store.dispatch(action);

    const {editPort, deletePort} = actions;

    const edit: ToolbarItem =
      {
        name: "Edit",
        action: () => this.dialogs.editPort(port, (model: IPortModel) => dispatch(editPort(model, port.id, flowId))),
        icon: ToolbarIcons.edit
      };

    const del: ToolbarItem =
      {
        name: "Delete",
        action: () => this.dialogs.deletePort(port.name, () => dispatch(deletePort(port.id, flowId))),
        icon: ToolbarIcons.delete
      };

    return new Toolbar(port.name, [edit, del]);
  }
}