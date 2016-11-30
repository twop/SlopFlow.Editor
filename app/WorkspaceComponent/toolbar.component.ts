import {Component, Input} from '@angular/core';
import {Toolbar, ToolbarItem} from '../Scene/toolbar';

@Component({
  selector: 'toolbar',
  template: `
  <div class="btn-group">
    <button *ngFor="let item of toolbar.items" (click)="item.action()" [disabled]="!item.isEnabled()" 
    [ngClass]="'btn-' + toolbarSize" class="btn btn-default">
      <span *ngIf="item.icon" [ngClass]="'fa-'+item.icon" class="fa" aria-hidden="true"></span>
      {{item.actionName}}
    </button>
  </div>`
})
export class ToolbarComponent
{
  @Input()
  public toolbar: Toolbar = null;

  @Input()
  public toolbarSize: string = "sm";
}