import {Component, Input, OnInit} from '@angular/core';
import { AuthenticateViaEmailPassword} from '../api/user';
import { Api } from '../api/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input()
  componentId: string;
  command: AuthenticateViaEmailPassword = new AuthenticateViaEmailPassword();
  errors: Object = new Object();

  constructor(private api: Api) {
  }

  ngOnInit() {
  }

  submitForm(event){
    this.api.auth(this.command).subscribe(response => {
      this.errors = response['errors'];
    });
  }
}
