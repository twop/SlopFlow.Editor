import { Component } from '@angular/core';

import { Scene} from '../Scene/scene'
import { Node } from '../Model/node'
import { NodeEventService } from '../Common/nodeEvent.service';
import {NodeWorkspace} from '../Scene/nodeWorkspace';

@Component({
  selector: 'my-assets',
  templateUrl: 'app/AssetsComponent/assets.component.html',
  styleUrls: ['app/AssetsComponent/assets.component.css'],
})

export class AssetsComponent 
{
  constructor(
    public scene: Scene,
    private nodeEventService: NodeEventService)
  { }
  
  activateWorkspace(workspace: NodeWorkspace): void
  {
    this.scene.activateWorkspace(workspace);
  }

  requestNewNode(): void
  {
    this.nodeEventService.requestNewNode.emit("NewNode");
  }

  requestNewFlow(): void
  {
    this.nodeEventService.requestNewFlow.emit("NewFlow");
  }
}