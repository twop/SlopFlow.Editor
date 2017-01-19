import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDialog } from './modalDialog';
import { IFlow } from '../store/flow.types';

export interface IElementModel
{
  origin:IFlow;
  name:string;
}

@Component({
  template:
  `
  <form (ngSubmit)="onSubmit()" #form="ngForm">
    <div class="modal-body">
      <button type="button" class="close" aria-label="Close" (click)="onCancel()">
        <span aria-hidden="true">&times;</span>
      </button>
      <h4 class="modal-title">Create element</h4>

      <div class="form-group input-group-sm">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" required [(ngModel)]="model.name" name="name" #name="ngModel">
        <div [hidden]="name.valid || name.pristine" class="alert alert-danger">
          Name is required
        </div>
        
        <div ng2-auto-complete 
          [source]="items"
          (valueChanged)="onInputChanged($event)"
          [list-formatter]="formatter"
          display-property-name="name"
          placeholder="Pick flow">
          <input name="origin" [ngModel]="model.origin" />
        </div>
      </div>

      <button type="submit" class="btn btn-primary btn-md" [disabled]="!form.form.valid">
        <span class="fa fa-save" aria-hidden="true"></span>
        Save
      </button>
      <button type="button" (click)="onCancel()" class="btn btn-secondary btn-md">Cancel</button>
    </div>
  </form>
  `})
export class CreateElementDialog extends ModalDialog<IElementModel>
{
  constructor(activeModal: NgbActiveModal)
  {
    super(activeModal);
  }
 
  onInputChanged(newVal: IFlow)
  {
    if (newVal && newVal.name)
    {
      this.model.origin = newVal; 
      //console.log("value is changed to ", newVal); 
    }
    else 
    {
      //console.log("temp value ", newVal);
    }
  }

  items: IFlow[] = null;
  model: IElementModel = {origin: null, name:"element"};
  formatter = (item: IFlow): string => `<span>${item.name}</span>`;
}
