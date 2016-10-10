import {Component, Input} from '@angular/core';

import {NodeWorkspace} from '../Scene/nodeWorkspace';
import {NewPortRequest} from '../Common/portEvents';
import {NodeEventService} from '../Common/nodeEvent.service';

@Component({
  selector: 'node-toolbar',
  templateUrl: 'app/WorkspaceComponent/nodeToolbar.component.html',
})
export class NodeToolbarComponent
{
  constructor(private eventService: NodeEventService)
  {}

  @Input()
  public workspace: NodeWorkspace;

  public requestNewPort(): void
  {
    this.eventService.requestNewPort.emit(new NewPortRequest("new port", this.workspace));
  }

  public renameNode(): void
  {
    this.eventService.requestEditNode.emit(this.workspace);
  }

  public undo(): void
  {
    this.workspace && this.workspace.undo();
  }

  public redo(): void
  {
    this.workspace && this.workspace.redo();
  }
}