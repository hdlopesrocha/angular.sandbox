import {Component, ViewChild} from '@angular/core';
import { Api } from './api/api';
import { AuthenticateViaEmailPassword } from './api/user';
import {BsModalRef, BsModalService, ModalDirective} from 'ngx-bootstrap';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public loginModalRef: BsModalRef;
  public registerModalRef: BsModalRef;


  constructor(private api: Api, public modalService : BsModalService) {

  }


  openLoginModal() {
    this.loginModalRef = this.modalService.show(LoginComponent);
  }

  openRegisterModal() {
    this.registerModalRef = this.modalService.show(RegisterComponent);
  }

   getInfo() {
    this.api.getInfo().subscribe(response => console.log(response));
   }
}
