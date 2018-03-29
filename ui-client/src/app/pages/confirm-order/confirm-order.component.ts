import {Component, Input, OnInit} from '@angular/core';
import {Address, Cart, CreateOrderCommand, Currency, Product} from "../../api/user";
import {ApiService} from "../../service/api.service";
import {CartService} from "../../service/cart.service";
import {Router} from "@angular/router";
import {AddressService} from "../../service/address.service";

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {
  public products: Product[] = [];

  constructor(private api: ApiService, public addressService: AddressService, public cartService: CartService, private router: Router) {
    console.log(router);
  }
  ngOnInit() {
    document.body.style.backgroundImage = 'url(http://localhost:8080/api/public/file/background_blur.jpg)';
    this.loadProducts();
    this.cartService.cartUpdated.subscribe(() => {
      this.loadProducts();
    });
  }

  confirm() {
    const command = new CreateOrderCommand();
    command.address = this.addressService.address;
    command.currency = Currency.EUR;
    command.cart = this.cartService.cart;

    this.api.createOrder(command).subscribe(() => {
      this.router.navigate(['/payment']);
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

  getTotal(currency: string){
    let total = 0;
    for(const product of this.products) {
      total += product.price[currency] * this.cartService.cart.amounts[product.id];
    }
    return total;
  }

  getKeys(map) {
    return Array.from(Object.keys(map));
  }

}
