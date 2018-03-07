import {Component, ElementRef, ViewChild} from '@angular/core';
import {RegisterUserViaEmail} from '../api/user';
import {Api} from '../api/api';
import {BsModalRef, TooltipDirective} from 'ngx-bootstrap';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  command: RegisterUserViaEmail = new RegisterUserViaEmail();
  errors: Object = new Object();
  @ViewChild('email') emailView: TooltipDirective;
  @ViewChild('confirmEmail') confirmEmailView: TooltipDirective;
  @ViewChild('password') passwordView: TooltipDirective;
  @ViewChild('confirmPassword') confirmPasswordView: TooltipDirective;

  constructor(private api: Api, public modal: BsModalRef) {
  }

  submitForm(event) {
    console.log('email');
    this.api.register(this.command).subscribe(response => {
      let errors = response['errors'];

      if(errors['email']){
        this.emailView.tooltip = errors['email'];
        this.emailView.show();
      }
      if(errors['confirmEmail']){
        this.confirmEmailView.tooltip = errors['confirmEmail'];
        this.confirmEmailView.show();
      }
      if(errors['password']){
        this.passwordView.tooltip = errors['password'];
        this.passwordView.show();
      }
      if(errors['confirmPassword']){
        this.confirmPasswordView.tooltip = errors['confirmPassword'];
        this.confirmPasswordView.show();
      }



    });
  }

  close() {
    this.modal.hide();
  }
}
