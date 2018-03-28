import {Component, OnInit} from '@angular/core';
import {Cart, Product, SaveCartCommand} from '../../api/user';
import {Api} from '../../service/api.service';
import {CartService} from '../../service/cart.service';

@Component({
  selector: 'app-cart-popover',
  templateUrl: './cart-popover.component.html',
  styleUrls: ['./cart-popover.component.css']
})
export class CartPopoverComponent implements OnInit {

  public products: Product[] = [];

  constructor(public api: Api, private cartService: CartService) {

  }

  ngOnInit() {
    this.loadProducts();
    this.cartService.cartUpdated.subscribe(() => {
      this.loadProducts();
    });
  }

  loadProducts(){
    if (Object.keys(this.cartService.cart.amounts).length) {
      this.api.getProducts(this.getKeys(this.cartService.cart.amounts)).subscribe(list => {
        this.products = [];
        list.forEach(prod => {
          this.products.push(prod);
        });
      });
    } else {
      this.products = [];
    }
  }

  updateCart(cart: Cart) {
    this.cartService.saveCart(cart);
  }

  deleteProduct(cart: Cart, product) {
    this.products.splice(this.products.indexOf(product), 1);
    delete cart.amounts[product.id];
    this.cartService.saveCart(cart);
  }

  getKeys(map) {
    return Array.from(Object.keys(map));
  }
}
