import {Component, OnInit} from '@angular/core';
import {ApiService} from './service/api.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {LoginModalComponent} from './components/login-modal/login-modal.component';
import {RegisterModalComponent} from './components/register-modal/register-modal.component';
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

  constructor(private api: ApiService, public modalService: BsModalService, translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }

  ngOnInit() {
  }

  openLoginModal() {
    this.loginModalRef = this.modalService.show(LoginModalComponent);
  }

  openRegisterModal() {
    this.registerModalRef = this.modalService.show(RegisterModalComponent);
  }

  isLoggedIn(){
    return this.api.isLoggedIn();
  }

  logout() {
    this.api.logout();
  }
}
