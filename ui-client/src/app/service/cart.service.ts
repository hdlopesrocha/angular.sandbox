import {EventEmitter, Injectable, OnInit, Output} from '@angular/core';
import {Cart, SaveCartCommand} from '../api/user';
import {ApiService} from "./api.service";

@Injectable()
export class CartService implements  OnInit {

  public cart: Cart;
  @Output()
  public cartUpdated: EventEmitter<any> = new EventEmitter();

  constructor(public api: ApiService) {
    this.cart = this.getLocalCart();
  }

  ngOnInit(): void {
    this.api.getCart().subscribe(cart => {
      this.cart = cart;
      this.saveCart(cart);
    });
  }

  public addToCart(cart: Cart, product: string, amount: number) {
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

  public saveCart(cart: Cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('cart updated', cart);
    const command = new SaveCartCommand();
    command.cart = this.cart;
    this.api.setCart(command);
    this.cartUpdated.emit();
  }

  private getLocalCart(): Cart {
    const cartStr = localStorage.getItem('cart');
    const cart = (cartStr ? JSON.parse(cartStr) : new Cart()) as Cart;
    if (!cart.amounts) {
      cart.amounts = {};
    }
    return cart;
  }
}
