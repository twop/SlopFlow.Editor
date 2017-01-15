import { Component, Input } from '@angular/core';
import { Toolbar } from '../../services/toolbar';

@Component({
  selector: 'context-toolbar',
  template: `
    <div *ngIf="toolbar">
      <span *ngIf="toolbar.name">{{toolbar.name}}</span>
      <toolbar [toolbar]="toolbar" [toolbarSize]="'sm'" ></toolbar>
      <button type="button" (click)="onClose()" class="close" style="float: none" aria-hidden="true">&times;</button>
    </div>
    `
})
export class ContextToolbarComponent
{
  @Input() toolbar: Toolbar = null;
  private onClose(): void { this.toolbar = null; };
}
