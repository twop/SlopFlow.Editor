import {Component} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {INode} from '../store/scene.types';

interface INodeModel
{
  name: string;
  isEditMode:boolean;
}

@Component({templateUrl: 'app/dialogs/nodeDialog.component.html'})
export class NodeDialogComponent
{
  constructor(public activeModal: NgbActiveModal)
  {}

  public model: INodeModel = null;

  public openCreateNode(name: string): void
  {
    this.model =  {name, isEditMode: false};
  }

  public openEditNode(node: INode): void
  {
    this.model = {name: node.name, isEditMode: true};
  }

  public onSubmit(): void
  {
    this.activeModal.close(this.model.name);
  }

  public onCancel(): void
  {
    this.activeModal.dismiss();
  }
}
