import {Component, Input} from '@angular/core';
import {Toolbar, ToolbarItem} from '../../services/toolbar';

@Component({
  selector: 'toolbar',
  template: `
  <div class="btn-group">
    <button *ngFor="let item of toolbar.items" (click)="item.action()" [disabled]="item.disabled" 
    [ngClass]="'btn-' + toolbarSize" class="btn btn-default">
      <span *ngIf="item.icon" [ngClass]="'fa-'+item.icon" class="fa" aria-hidden="true"></span>
      {{item.name}}
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