import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {IDataType} from '../store/dataType.types';
import {PortType, IPort} from '../store/node.types';
import {ModalDialog} from './modalDialog';

export interface IPortModel
{
  name: string;
  dataTypeId: number;
  isEditMode: boolean;
  portType: PortType;
}

@Component({
  templateUrl: 'app/dialogs/portDialog.component.html'
})
export class PortDialogComponent extends ModalDialog<IPortModel>
{
  constructor( activeModal: NgbActiveModal)
  {
    super(activeModal);
  }

  public model: IPortModel = null;
  public dataTypes: Array<IDataType>;
  public portTypeEnum = PortType;

  public createPort(portName: string, dataTypes: Array<IDataType>): void
  {
    this.dataTypes = dataTypes;
    this.model =
      {
        name: portName,
        dataTypeId: dataTypes[0].id,
        isEditMode: false,
        portType: PortType.Input
      };
  }

  public editPort(port: IPort, dataTypes: Array<IDataType>): void
  {
    this.dataTypes = dataTypes;
    this.model =
      {
        name: port.name,
        dataTypeId: port.dataTypeId,
        isEditMode: true,
        portType: port.type
      };
  }
}
