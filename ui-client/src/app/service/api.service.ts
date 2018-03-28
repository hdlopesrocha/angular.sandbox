import {
  Address,
  AuthenticateViaEmailPasswordCommand,
  Cart,
  Country,
  CreateOrderCommand,
  Product,
  RegisterUserViaEmailCommand,
  SaveAddressCommand,
  SaveCartCommand
} from '../api/user';
import {HttpClient, HttpParams} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Observable} from 'rxjs/Observable';
import {CommandResult} from "../api/common";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ApiService {

  public host = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public setToken(token: string) {
    localStorage.setItem('token', token);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') != null;
  }

  logout() {
    localStorage.removeItem('token');
  }

  auth(command: AuthenticateViaEmailPasswordCommand): Observable<CommandResult<string>> {
    return this.http.post<CommandResult<string>>(this.host + '/api/public/auth', command);
  }

  register(command: RegisterUserViaEmailCommand): Observable<CommandResult<boolean>> {
    return this.http.put<CommandResult<boolean>>(this.host + '/api/public/register', command);
  }

  getAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(this.host + '/api/address');
  }

  saveAddress(command: SaveAddressCommand): Observable<Address> {
    return this.http.put<Address>(this.host + '/api/address', command);
  }

  deleteAddress(uuid: string): Observable<Address[]> {
    return this.http.delete<Address[]>(this.host + '/api/address/'+uuid);
  }

  getProducts(ids: string[]): Observable<Product[]> {
    let params = new HttpParams();
    ids.forEach(id => {
      params = params.append('id', id);
    });
    return this.http.get<Product[]>(this.host + '/api/public/product', {params: params});
  }

  getCountries(): Country[] {
    // TODO: iterate all countries
    return [Country.FR, Country.BE, Country.CH, Country.GB];
  }

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(this.host + '/api/cart');
  }

  setCart(command: SaveCartCommand) {
    this.http.post(this.host + '/api/cart', command).subscribe(() => {});
  }

  createOrder(command: CreateOrderCommand) {
    return this.http.put(this.host + '/api/order', command);
  }
}
