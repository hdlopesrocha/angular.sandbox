import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../api/user';
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

  constructor(private api: Api) {
    this.amount = 0;
  }

  ngOnInit() {
  }

  submit() {
    this.api.addToCart(this.product.id, this.amount);
  }

}
