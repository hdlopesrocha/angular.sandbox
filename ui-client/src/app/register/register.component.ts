import {Component, Input, OnInit} from '@angular/core';
import { RegisterUserViaEmail} from '../api/user';
import { Api } from '../api/api';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input()
  componentId: string;
  command: RegisterUserViaEmail = new RegisterUserViaEmail();
  errors: Object = new Object();

  constructor(private api: Api) {
  }

  ngOnInit() {
  }

  submitForm(event){
    this.api.register(this.command).subscribe(response => {
      this.errors = response['errors'];
    });
  }
}
