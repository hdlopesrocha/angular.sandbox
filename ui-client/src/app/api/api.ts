import {AuthenticateViaEmailPassword, Product, RegisterUserViaEmail, Cart, Address} from './user';
import {HttpClient, HttpParams} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Observable} from 'rxjs/Observable';
import {CommandResult} from './common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class Api {

  public host = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public setToken(token: string) {
    localStorage.setItem('token', token);
  }

  auth(command: AuthenticateViaEmailPassword): Observable<CommandResult<string>> {
    return this.http.post<CommandResult<string>>(this.host + '/api/public/auth', command);
  }

  register(command: RegisterUserViaEmail): Observable<CommandResult<boolean>> {
    return this.http.put<CommandResult<boolean>>(this.host + '/api/public/register', command);
  }

  getAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(this.host + '/api/address');
  }

  getProducts(ids: string[]): Observable<Product[]> {
    let params = new HttpParams();
    ids.forEach(id => {
      params = params.append('id', id);
    });
    return this.http.get<Product[]>(this.host + '/api/public/product', {params: params});
  }

  getCart(fallback: Cart): Observable<Cart> {
    return this.http.get<Cart>(this.host + '/api/public/cart').map(cart => {
      return cart ? cart : fallback;
    });
  }

  setCart(cart: Cart) {
    this.http.post(this.host + '/api/public/cart', cart).subscribe(() => {});
  }


}
