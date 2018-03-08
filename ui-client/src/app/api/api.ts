import { AuthenticateViaEmailPassword , RegisterUserViaEmail} from './user'
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class Api {

  public host = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  auth(command: AuthenticateViaEmailPassword){
    return this.http.post(this.host + '/api/auth', command);
  }

  register(command: RegisterUserViaEmail){
    return this.http.put(this.host + '/api/register', command);
  }

}
