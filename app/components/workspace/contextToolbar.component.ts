import {Component} from '@angular/core';
import {ContextToolbarService} from '../../services/contextToolbar.service';
import {Toolbar} from '../../services/toolbar';

@Component({
  selector: 'context-toolbar',
  template: `
    <div *ngIf="toolbar_">
      <span *ngIf="toolbar_.name">{{toolbar_.name}}</span>
      <toolbar [toolbar]="toolbar_" [toolbarSize]="'sm'" ></toolbar>
      <button type="button" (click)="onClose()" class="close" style="float: none" aria-hidden="true">&times;</button>
    </div>
    `
})
export class ContextToolbarComponent
{
  constructor( private toolbarService: ContextToolbarService)
  {
    toolbarService.newToolbarEvent.subscribe((t) => this.toolbar_ = t);
  }

  private toolbar_:Toolbar = null;
  private onClose = ():void => this.toolbar_ = null;
}
