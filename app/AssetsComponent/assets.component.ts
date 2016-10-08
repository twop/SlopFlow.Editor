import { Component } from '@angular/core';

import { Scene} from '../Scene/scene'
import { Node } from '../Model/node'
import { NodeEventService } from '../Common/nodeEvent.service';
import {Workspace} from '../Scene/workspace';

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
  
  activateWorkspace(workspace: Workspace): void
  {
    this.scene.activateWorkspace(workspace);
  }

  requestNewNode(): void
  {
    //TODO: add a name validation
    this.nodeEventService.requestNewNode.emit("NewName");
  }
}