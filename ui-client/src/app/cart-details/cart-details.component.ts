import { Component, OnInit } from '@angular/core';
import {Api} from '../api/api';
import {Cart} from '../api/user';
import {CartService} from '../service/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
  public cart: Cart;

  constructor(public api: Api, private cartService: CartService) {

  }

  ngOnInit() {
    this.api.getCart(this.cartService.getLocalCart()).subscribe(cart => {
      this.cart = cart;
    });
  }

}
