import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Api} from './api/api';
import {Cart, Product} from './api/user';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  public loginModalRef: BsModalRef;
  public registerModalRef: BsModalRef;
  public products: Product[];
  public cart: Cart;

  constructor(private api: Api, public modalService: BsModalService, translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');

    this.api.getProducts([]).subscribe(list => {
      this.products = list;
    });

    this.api.getCart().subscribe(cart => {
      this.cart = cart;
    });
  }

  ngOnInit() {

  }

  onCartUpdated(event: Cart) {
    this.cart = event;
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
