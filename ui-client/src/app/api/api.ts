import {AuthenticateViaEmailPassword, Product, RegisterUserViaEmail, Cart} from './user';
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

  getInfo() {
    return this.http.get(this.host + '/api/info');
  }

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(this.host + '/api/public/cart');
  }

  addToCart(product: string, amount: number) {
    this.getCart().subscribe(cart => {
      cart = this.internalAddToCart(cart, product, amount);
      this.setLocalCart(cart);

      this.http.post(this.host + '/api/public/cart', cart).subscribe(() => {});
    }, () => {
      const cart = this.internalAddToCart(null, product, amount);
      this.setLocalCart(cart);
    });
  }

  private internalAddToCart(cart: Cart, product: string, amount: number){
    if (!cart) {
      cart = this.getLocalCart();
    }
    if (!cart.amounts[product]) {
      cart.amounts[product] = amount;
    } else {
      cart.amounts[product] += amount;
    }
    if (!cart.amounts[product]) {
      delete cart.amounts[product];
    }
    return cart;
  }
  getProducts(ids: string[]): Observable<Product[]> {
    let params = new HttpParams();
    ids.forEach(id => {
      params = params.append('id', id);
    });
    return this.http.get<Product[]>(this.host + '/api/public/product', {params: params});
  }

  getLocalCart(): Cart {
    const cartStr = localStorage.getItem('cart');
    const cart = (cartStr ? JSON.parse(cartStr) : new Cart()) as Cart;
    if (!cart.amounts) {
      cart.amounts = {};
    }
    return cart;
  }

  setLocalCart(cart: Cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
