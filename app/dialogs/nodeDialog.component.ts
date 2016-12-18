import {Component} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {INode} from '../store/node.types';
import {ModalDialog} from './modalDialog';

@Component({templateUrl: 'app/dialogs/nodeDialog.component.html'})
export class NodeDialogComponent extends ModalDialog<string>
{
  constructor(activeModal: NgbActiveModal)
  {
    super(activeModal);
  }

  public title: string = null;
  public model: string = null;
}
