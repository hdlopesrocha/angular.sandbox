import {AuthenticateViaEmailPassword, Product, RegisterUserViaEmail, Cart} from './user';
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

  auth(command: AuthenticateViaEmailPassword): Observable<CommandResult<string>> {
    return this.http.post<CommandResult<string>>(this.host + '/api/public/auth', command);
  }

  register(command: RegisterUserViaEmail): Observable<CommandResult<boolean>> {
    return this.http.put<CommandResult<boolean>>(this.host + '/api/public/register', command);
  }

  getInfo(){
    return this.http.get(this.host + '/api/info');
  }

  getCart(): Observable<Cart> {
    const cartStr = localStorage.getItem('cart');
    const cart = (cartStr ? JSON.parse(cartStr) : null) as Cart;
    if (!cart || cart.id) {
      return this.http.get<Cart>(this.host + '/api/public/cart');
    }
    return Observable.of(cart);
  }

  sendCart(cart: Cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    this.http.post(this.host + '/api/public/cart', cart);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.host + '/api/public/product');
  }

}
