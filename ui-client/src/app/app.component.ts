import {Component, ViewChild} from '@angular/core';
import { Api } from './api/api';
import {AuthenticateViaEmailPassword, Product} from './api/user';
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
  public products: Product[];

  constructor(private api: Api, public modalService : BsModalService) {
    this.api.getProducts().subscribe(list => {
      this.products = list;
    });
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
