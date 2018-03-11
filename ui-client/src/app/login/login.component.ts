import {Component} from '@angular/core';
import { AuthenticateViaEmailPassword} from '../api/user';
import { Api } from '../api/api';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  command: AuthenticateViaEmailPassword = new AuthenticateViaEmailPassword();
  errors: Object = new Object();

  constructor(private api: Api, public modal: BsModalRef) {
  }
  submitForm(event){
    this.api.auth(this.command).subscribe(response => {
      this.errors = response['errors'];
       this.api.setToken(response['result'] as string);
      console.log('login', response);

    });
  }

  close(){
    this.modal.hide();
  }
}
