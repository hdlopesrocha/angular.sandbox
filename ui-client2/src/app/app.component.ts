import { Component } from '@angular/core';
import { Api } from './api/api';
import { AuthenticateViaEmailPassword } from './api/user'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private api: Api) {
      var authCmd:  AuthenticateViaEmailPassword = new AuthenticateViaEmailPassword();
      this.api.auth(authCmd).subscribe(response => console.log(response));

    }


  buttonClick(){
    console.log("click");
  }


}
