import {Component} from '@angular/core';
import {ModalDialog} from './modalDialog';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

type ButtonStyle = 'btn-primary' | 'btn-danger';

export interface IAuthModel
{
  title:string;
  text:string;
  buttonText: string;
  buttonIcon: string;
  buttonStyle: ButtonStyle;
}

@Component({
  template: `
      <div class="modal-body">
        <button type="button" class="close" aria-label="Close" (click)="onCancel()">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="modal-title">AUTH OR NOT</h4>
    
        <p class="card-text">AUTH OR NOT</p>
    
        <button type="button" (click)="onSubmit()" class="btn btn-md">
        Auth
        </button>
        
        <button type="button" (click)="onCancel()" class="btn btn-secondary btn-md">
          Cancel
        </button>
      </div>`
})
export class AuthorizationDialogComponent extends ModalDialog<IAuthModel>
{
  constructor(activeModal: NgbActiveModal)
  {
    super(activeModal);
  }

  showConfirmation = (confirmation:IAuthModel) => this.model = confirmation;
  model: IAuthModel = null;
}
