import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cart, Product} from '../api/user';
import {Api} from '../service/api.service';
import {CartService} from '../service/cart.service';

@Component({
  selector: 'app-cart-popover',
  templateUrl: './cart-popover.component.html',
  styleUrls: ['./cart-popover.component.css']
})
export class CartPopoverComponent implements OnInit {

  public cart: Cart;
  public products: Product[] = [];

  constructor(public api: Api, private cartService: CartService) {

  }

  onCartArrived(ctx) {
    return function (cart) {
      ctx.cart = cart;
      if (Object.keys(cart.amounts).length) {
        ctx.api.getProducts(ctx.getKeys(cart.amounts)).subscribe(list => {
          ctx.products = [];
          list.forEach(prod => {
            ctx.products.push(prod);
          });
        });
      } else {
        ctx.products = [];
      }
    };
  }

  ngOnInit() {
    this.api.getCart(this.cartService.getLocalCart()).subscribe(this.onCartArrived(this));
    this.cartService.cartUpdated.subscribe(this.onCartArrived(this));
  }

  updateCart(cart: Cart) {
    this.cartService.updateCart(cart);
    this.api.setCart(cart);
  }

  deleteProduct(cart: Cart, product) {
    this.products.splice(this.products.indexOf(product), 1);
    delete this.cart.amounts[product.id];
    this.updateCart(cart);
  }

  getKeys(map) {
    return Array.from(Object.keys(map));
  }
}
