import {Component} from '@angular/core';
import {ModalDialog} from './modalDialog';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

type ButtonStyle = 'btn-primary' | 'btn-danger';

export interface IConfirmation
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
        <h4 class="modal-title">{{model.title}}</h4>
    
        <p class="card-text">{{model.text}}</p>
    
        <button type="button" (click)="onSubmit()" [ngClass]="model.buttonStyle" class="btn btn-md">
          <span [ngClass]="'fa fa-'+model.buttonIcon" aria-hidden="true"></span>
          {{model.buttonText}}
        </button>
        
        <button type="button" (click)="onCancel()" class="btn btn-secondary btn-md">
          Cancel
        </button>
      </div>`
})
export class ConfirmatioDialogComponent extends ModalDialog<IConfirmation>
{
  constructor(activeModal: NgbActiveModal)
  {
    super(activeModal);
  }

  showConfirmation = (confirmation:IConfirmation) => this.model = confirmation;
  model: IConfirmation = null;
}
