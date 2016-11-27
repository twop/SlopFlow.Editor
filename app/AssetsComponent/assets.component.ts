import { Component } from '@angular/core';

import { Scene} from '../Scene/scene'
import {NodeWorkspace} from '../Scene/nodeWorkspace';
import {ModalService} from '../Forms/modal.service';

@Component({
  selector: 'my-assets',
  templateUrl: 'app/AssetsComponent/assets.component.html',
  styleUrls: ['app/AssetsComponent/assets.component.css'],
})

export class AssetsComponent 
{
  constructor(
    public scene: Scene,
    private modalService: ModalService)
  { }
  
  activateWorkspace(workspace: NodeWorkspace): void
  {
    this.scene.activateWorkspace(workspace);
  }

  requestNewNode(): void
  {
    this.modalService.openNewNodeDialog(this.scene, "NewNode");
  }

  requestNewFlow(): void
  {
    //this.nodeEventService.requestNewFlow.emit("NewFlow");
  }
}