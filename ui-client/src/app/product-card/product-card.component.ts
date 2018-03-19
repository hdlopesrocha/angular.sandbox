import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cart, Product} from '../api/user';
import {Api} from '../api/api';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input()
  public product: Product;
  public amount: number;
  @Output()
  public cartUpdated: EventEmitter<Cart> = new EventEmitter();

  constructor(private api: Api) {
    this.amount = 1;
  }

  ngOnInit() {
  }

  submit() {
    this.api.getCart().subscribe(cart => {
      this.api.addToCart(cart, this.product.id, this.amount);
      this.api.setCart(cart);
      this.cartUpdated.emit(this.api.getLocalCart());
    });
  }

}
