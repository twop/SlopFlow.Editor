import {Component} from '@angular/core';
import {ContextToolbarService} from '../Scene/contextToolbar.service';
import {Toolbar} from '../Scene/toolbar';
import {Scene} from '../Scene/scene';

@Component({
  selector: 'context-toolbar',
  template: `
    <div *ngIf="toolbar_">
      <span *ngIf="toolbar_.name">{{toolbar_.name}}</span>
      <toolbar [toolbar]="toolbar_" [toolbarSize]="'xs'" ></toolbar>
      <button type="button" (click)="onClose()" class="close" aria-hidden="true">&times;</button>
    </div>
    `
})
export class ContextToolbarComponent
{
  constructor(scene:Scene, private toolbarService: ContextToolbarService)
  {
    toolbarService.newToolbarEvent.subscribe((t) => this.toolbar_ = t);
    scene.activeWorkspaceChanged.subscribe(this.onClose);
    scene.workspaceModified.subscribe(this.onClose);
  }

  private toolbar_:Toolbar = null;
  private onClose = ():void => this.toolbar_ = null;
}
