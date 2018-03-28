import {Component} from '@angular/core';
import {AuthenticateViaEmailPasswordCommand} from '../../api/user';
import {ApiService} from '../../service/api.service';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  command: AuthenticateViaEmailPasswordCommand = new AuthenticateViaEmailPasswordCommand();
  errors: Object = new Object();

  constructor(private api: ApiService, public modal: BsModalRef) {
  }
  submitForm(event){
    this.api.auth(this.command).subscribe(response => {
       this.api.setToken(response.result);
      console.log('login', response);

    });
  }

  close() {
    this.modal.hide();
  }
}
