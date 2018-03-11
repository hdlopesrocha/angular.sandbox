import { AuthenticateViaEmailPassword , RegisterUserViaEmail} from './user'
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable} from 'rxjs/Observable';
import { CommandResult } from './common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class Api {

  public host = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public setToken(token: string) {
    localStorage.setItem('token', token);
  }

  auth(command: AuthenticateViaEmailPassword): Observable<Object> {
    return this.http.post(this.host + '/api/public/auth', command);
  }

  register(command: RegisterUserViaEmail): Observable<Object> {
    return this.http.put(this.host + '/api/public/register', command);
  }

  getInfo(){
    return this.http.get(this.host + '/api/info');
  }

}
