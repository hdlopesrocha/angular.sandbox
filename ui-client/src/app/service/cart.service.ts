import {EventEmitter, Injectable, Output} from '@angular/core';
import {Cart} from '../api/user';

@Injectable()
export class CartService {

  @Output()
  public cartUpdated: EventEmitter<Cart> = new EventEmitter();

  constructor() { }

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

  public updateCart(cart: Cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('cart updated', cart);
    this.cartUpdated.emit(cart);
  }

  getLocalCart(): Cart {
    const cartStr = localStorage.getItem('cart');
    const cart = (cartStr ? JSON.parse(cartStr) : new Cart()) as Cart;
    if (!cart.amounts) {
      cart.amounts = {};
    }
    return cart;
  }
}
