import {Component} from '@angular/core';
import { RegisterUserViaEmail} from '../api/user';
import { Api } from '../api/api';
import {BsModalRef} from 'ngx-bootstrap';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  command: RegisterUserViaEmail = new RegisterUserViaEmail();
  errors: Object = new Object();

  constructor(private api: Api, public modal: BsModalRef) {
  }

  submitForm(event){
    this.api.register(this.command).subscribe(response => {
      this.errors = response['errors'];
    });
  }

  close(){
    this.modal.hide();
  }
}
