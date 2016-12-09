import {Injectable} from '@angular/core';
import {NgbModal, NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {NodeDialogComponent} from '../dialogs/nodeDialog.component';
import {SceneActions} from '../actions/scene.actions';
import {INode} from '../store/scene.types';
import {NodeActions} from '../actions/node.actions';

@Injectable()
export class UserStoryService
{
  constructor(
    private modalService: NgbModal,
    private sceneActions: SceneActions,
    private nodeActions: NodeActions)
  {}

  private open<T>(type: { new(activeModal: NgbActiveModal): T }, initFunc?: (component: T) => void): Promise<any>
  {
    const modalRef: NgbModalRef = this.modalService.open(type);
    const component: T = modalRef.componentInstance;
    if (initFunc)
      initFunc(component);

    return modalRef.result;
  }

  public createNode() : void
  {
    this
      .open(NodeDialogComponent, (d) => d.openCreateNode("newNode"))
      .then((nodeName?: string) =>
      {
        if (nodeName)
          this.sceneActions.newNode(nodeName);
      });
  }

  public renameNode(node: INode) : void
  {
    this
      .open(NodeDialogComponent, (d) => d.openEditNode(node))
      .then((nodeName?: string) =>
      {
        if (nodeName)
          this.nodeActions.rename(node.id, nodeName);
      });
  }
}
