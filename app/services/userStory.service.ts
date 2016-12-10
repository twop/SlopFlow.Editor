import {Injectable} from '@angular/core';
import {NgbModal, NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {SceneActions} from '../actions/scene.actions';
import {NodeActions} from '../actions/node.actions';
import {NgRedux} from 'ng2-redux';
import {PortDialogComponent, IPortModel} from '../dialogs/portDialog.component';
import {IDataType} from '../store/dataType.types';
import {NodeDialogComponent} from '../dialogs/nodeDialog.component';
import {IAppState} from '../store/store';
import {INode} from '../store/node.types';

@Injectable()
export class UserStoryService
{
  constructor(
    private modalService: NgbModal,
    private sceneActions: SceneActions,
    private nodeActions: NodeActions,
    private ngRedux: NgRedux<IAppState>)
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
      .open(NodeDialogComponent, (d) => d.create("newNode"))
      .then((nodeName?: string) =>
      {
        if (nodeName)
          this.sceneActions.newNode(nodeName);
      });
  }

  public renameNode(node: INode) : void
  {
    this
      .open(NodeDialogComponent, (d) => d.edit(node))
      .then((nodeName?: string) =>
      {
        if (nodeName)
          this.nodeActions.rename(node.id, nodeName);
      });
  }

  public createPort(node: INode) : void
  {
    const dataTypes: Array<IDataType> = this.ngRedux.getState().scene.types.toArray();
    this
      .open(PortDialogComponent, (d) => d.create("newPort", dataTypes))
      .then((portModel?: IPortModel) =>
      {
        if (portModel)
          this.nodeActions.newPort( portModel, node);
      });
  }
}
