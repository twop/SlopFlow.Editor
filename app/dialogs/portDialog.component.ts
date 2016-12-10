import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {IDataType} from '../store/dataType.types';

export interface IPortModel
{
  name: string;
  dataTypeId: number;
  isEditMode: boolean;
  isInput: boolean;
}

@Component({
  templateUrl: 'app/dialogs/portDialog.component.html'
})
export class PortDialogComponent
{
  constructor(public activeModal: NgbActiveModal)
  {
  }

  public model: IPortModel = null;
  public dataTypes : Array<IDataType>;

  public create(portName: string, dataTypes: Array<IDataType>): void
  {
    this.dataTypes = dataTypes;
    this.model =
      {
        name:portName,
        dataTypeId: dataTypes[0].id,
        isEditMode:false,
        isInput:true
      };
  }

  public onSubmit = (): void => this.activeModal.close(this.model);
  public onCancel = (): void => this.activeModal.dismiss();
}
