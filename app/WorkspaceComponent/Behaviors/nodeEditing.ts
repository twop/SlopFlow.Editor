import {Node} from '../../Model/node';
import {NodePort} from '../../Model/node';
import {NodeEventService} from '../../Common/nodeEvent.service';
import {EditPortRequest} from '../../Common/portEvents';
import {NodeWorkspace} from '../../Scene/nodeWorkspace';
import {ISceneItem} from '../../Scene/sceneItem';

export class NodeEditing
{
  constructor(private nodeWorkspace:NodeWorkspace, private eventService: NodeEventService)
  {}

  public mouseDownOn(element:ISceneItem):void
  {
    var modelObject = element.modelObject;

    if (modelObject instanceof Node)
    {
      this.eventService.requestEditNode.emit( this.nodeWorkspace);
    }
    else if (modelObject instanceof NodePort)
    {
      this.eventService.requestEditPort.emit( new EditPortRequest(modelObject, this.nodeWorkspace));
    }
  }
}
