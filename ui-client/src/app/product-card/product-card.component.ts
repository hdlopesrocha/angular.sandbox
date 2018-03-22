import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cart, Product} from '../api/user';
import {Api} from '../api/api';
import {CartService} from '../service/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input()
  public product: Product;
  public amount: number;

  constructor(private api: Api, private cartService: CartService) {
    this.amount = 1;
  }

  ngOnInit() {
  }

  submit() {
    this.api.getCart(this.cartService.getLocalCart()).subscribe(cart => {
      this.cartService.addToCart(cart, this.product.id, this.amount);
      this.cartService.updateCart(cart);
      this.api.setCart(cart);
    });
  }

}
