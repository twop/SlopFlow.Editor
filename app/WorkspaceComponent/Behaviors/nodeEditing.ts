import {Node} from '../../Model/node';
import {Port} from '../../Model/port';
import {NodeEventService} from '../../Common/nodeEvent.service';
import {EditPortRequest} from '../../Common/portEvents';
import {Workspace} from '../../Scene/workspace';
import {IElementInstance} from '../../Scene/elementInstance';

export class NodeEditing
{
  constructor(private workspace:Workspace, private eventService: NodeEventService)
  {}

  public mouseDownOn(element:IElementInstance):void
  {
    var modelObject = element.modelObject;

    if (modelObject instanceof Node)
    {
      this.eventService.requestEditNode.emit( this.workspace);
    }
    else if (modelObject instanceof Port)
    {
      this.eventService.requestEditPort.emit( new EditPortRequest(modelObject, this.workspace));
    }
  }
}
