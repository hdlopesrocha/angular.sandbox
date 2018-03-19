import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cart, Product} from '../api/user';
import {Api} from '../api/api';

@Component({
  selector: 'app-cart-popover',
  templateUrl: './cart-popover.component.html',
  styleUrls: ['./cart-popover.component.css']
})
export class CartPopoverComponent implements OnInit {
  @Input('cart')
  public cart: Cart;
  public products: Product[] = [];
  @Output()
  public cartUpdated: EventEmitter<Cart> = new EventEmitter();

  constructor(public api: Api) {

  }

  ngOnInit() {
    this.api.getProducts(this.getKeys(this.cart.amounts)).subscribe(list => {
      this.products = [];
      list.forEach(prod => {
        this.products.push(prod);
      });
    });
  }

  updateCart() {
    this.api.setCart(this.cart);
    this.cartUpdated.emit(this.cart);
  }

  deleteProduct(product) {
    this.products.splice(this.products.indexOf(product), 1);
    delete this.cart.amounts[product.id];
    this.updateCart();
  }

  getKeys(map) {
    return Array.from(Object.keys(map));
  }
}
