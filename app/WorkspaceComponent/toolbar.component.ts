import {Component, Input} from '@angular/core';
import {Toolbar} from '../Scene/toolbar';

@Component({
  selector: 'context-toolbar',
  template: `
  <div class="btn-group">
    <button *ngFor="let item of toolbar.items" (click)="item.action()" [disabled]="!item.enabled" [ngClass]="'btn-' + 
    toolbarSize" class="btn btn-default">
      <span *ngIf="item.glyphicon" [ngClass]="item.glyphicon" class="glyphicon" aria-hidden="true"></span>
      {{item.actionName}}
    </button>
  </div>`
})
export class ToolbarComponent
{
  @Input()
  public toolbar: Toolbar = null;

  @Input()
  public toolbarSize: string = "xs";
}