import { Component } from '@angular/core';

import { Scene} from '../Scene/scene'
import { Node } from '../Scene/node'
import { NodeEventService } from '../Common/node-event.service';

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
  
  selectNode(node: Node): void
  {
    this.scene.selectNode(node);
  }

  requestNewNode(): void
  {
    //TODO: add a name validation
    this.nodeEventService.requestNewNode.emit("NewName");
  }
}