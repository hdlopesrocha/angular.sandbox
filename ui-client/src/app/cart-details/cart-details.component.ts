import { Component, OnInit } from '@angular/core';
import {Api} from '../api/api';
import {Cart} from '../api/user';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
  public cart: Cart;

  constructor(public api: Api) {
    this.api.getCart().subscribe(cart => {
      this.cart = cart;
    });
  }

  ngOnInit() {
  }

}
