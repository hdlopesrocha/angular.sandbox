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

  public cart: Cart;
  public products: Product[] = [];

  constructor(public api: Api, private cartService: CartService) {

  }

  onCartArrived(cart: Cart) {
    this.cart = cart;
    if (Object.keys(cart.amounts).length) {
      this.api.getProducts(this.getKeys(cart.amounts)).subscribe(list => {
        this.products = [];
        list.forEach(prod => {
          this.products.push(prod);
        });
      });
    } else {
      this.products = [];
    }
  }

  ngOnInit() {
    this.api.getCart().subscribe(cart => {
      this.onCartArrived(cart)
    }, () => {
      this.onCartArrived(this.cartService.getLocalCart())
    });
    this.cartService.cartUpdated.subscribe(cart => {
      this.onCartArrived(cart);
    });
  }

  updateCart(cart: Cart) {
    this.cartService.updateCart(cart);
    const command = new SaveCartCommand();
    command.cart = cart;
    this.api.setCart(command);
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
