import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

export abstract class ModalDialog<TModel>
{
  constructor(private activeModal: NgbActiveModal)
  {}

  abstract model : TModel = null;

  public onSubmit = (): void => this.activeModal.close(this.model);
  public onCancel = (): void => this.activeModal.dismiss();
}
