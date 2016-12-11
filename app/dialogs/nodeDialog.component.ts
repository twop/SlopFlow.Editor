import {Component} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {INode} from '../store/node.types';
import {ModalDialog} from './modalDialog';

export interface INodeModel
{
  name: string;
  isEditMode: boolean;
}

@Component({templateUrl: 'app/dialogs/nodeDialog.component.html'})
export class NodeDialogComponent extends ModalDialog<INodeModel>
{
  constructor(activeModal: NgbActiveModal)
  {
    super(activeModal);
  }

  public model: INodeModel = null;

  public createNode(name: string): void
  {
    this.model = {name, isEditMode: false};
  }

  public editNode(node: INode): void
  {
    this.model = {name: node.name, isEditMode: true};
  }
}
