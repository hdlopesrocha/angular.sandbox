import {Component, Input, OnInit} from '@angular/core';
import {Address, CreateOrderCommand, Currency} from "../../api/user";
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

  constructor(private api: ApiService, public addressService: AddressService, public cartService: CartService, router: Router) {
    console.log(router);
  }
  ngOnInit() {
    document.body.style.backgroundImage = 'url(http://localhost:8080/api/public/file/background_blur.jpg)';
    console.log(this);
  }

  confirm() {
    const command = new CreateOrderCommand();
    command.address = this.addressService.address;
    command.currency = Currency.EUR;
    command.cart = this.cartService.cart;

    this.api.createOrder(command).subscribe(() => {
      console.log("CreateOrderCommand OK!");
    });
  }
}
