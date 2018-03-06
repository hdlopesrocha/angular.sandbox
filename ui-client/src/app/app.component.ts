import { Component } from '@angular/core';
import { Api } from './api/api';
import { AuthenticateViaEmailPassword } from './api/user';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private api: Api) {
      const authCmd:  AuthenticateViaEmailPassword = new AuthenticateViaEmailPassword();
      authCmd.email = 'hdlopesrocha91@gmail.com';
      authCmd.password = 'qazokm';

      this.api.auth(authCmd).subscribe(response => console.log(response));
      }



}
