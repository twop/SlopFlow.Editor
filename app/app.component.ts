import { Component } from '@angular/core';
import { AuthorizationDialogComponent, IAuthModel } from './dialogs/authorizationDialog.component';
import { ModalService } from './Forms/modal.service';
import {NgbModal, NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'my-app',
  styleUrls: ['app/app.component.css'],
  templateUrl: 'app/app.component.html'
})

export class AppComponent 
{
  title = 'SlopFlow editor';

  constructor(private modalService: NgbModal) { }

  public onAuth()
  {

    var settings =
      {
        type: AuthorizationDialogComponent,
        onSuccess: (model: IAuthModel) => {console.log("aith clicked")}
      };

    const modalRef:NgbModalRef = this.modalService.open(AuthorizationDialogComponent);
    const component:AuthorizationDialogComponent = modalRef.componentInstance;

    const reportResult = (res) =>
    {
        console.log(`dialog result:`);
        window.location.href = '/auth'
    };

    const reportFailure = (reason) =>
    {
      if (reason)
      {
        console.log('auth failed:');
        console.log(reason);
      }
    };

    modalRef.result
      .then(reportResult)
      .catch(reportFailure);
  }
}