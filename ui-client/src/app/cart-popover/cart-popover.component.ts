import { Component, OnInit } from '@angular/core';
import {Cart, Product} from '../api/user';
import {Api} from '../api/api';

@Component({
  selector: 'app-cart-popover',
  templateUrl: './cart-popover.component.html',
  styleUrls: ['./cart-popover.component.css']
})
export class CartPopoverComponent implements OnInit {
  public cart: Cart;
  public products: Map<Product, number> = new Map<Product, number>();

  constructor(public api: Api) {
    this.api.getCart().subscribe(cart => {
      if (!cart) {
        cart = this.api.getLocalCart();
      }

      this.cart = cart;
      this.api.getProducts(this.getKeys(cart.amounts)).subscribe(list => {
        this.products = new Map<Product, number>();
        list.forEach(prod => {
          this.products.set(prod, cart.amounts[prod.id]);
        });
      });
    });
  }

  ngOnInit() {
  }

  getMapKeys(map) {
    return Array.from(map.keys());
  }

  getKeys(map) {
    return Array.from(Object.keys(map));
  }
}
