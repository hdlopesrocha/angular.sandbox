import {Component, Input, OnInit} from '@angular/core';
import {Address, Cart, CreateOrderCommand, Currency} from "../../api/user";
import {Api} from "../../service/api.service";
import {CartService} from "../../service/cart.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {
  @Input()
  public address: Address;

  constructor(private api: Api, public cartService: CartService, router: Router) {
    console.log(router);
  }
  ngOnInit() {
    document.body.style.backgroundImage = 'url(http://localhost:8080/api/public/file/background_blur.jpg)';
    console.log(this);
  }

  confirm() {
    const command = new CreateOrderCommand();
    command.address = this.address;
    command.currency = Currency.EUR;
    command.cart = this.cartService.cart;

    this.api.createOrder(command).subscribe(() => {
      console.log("CreateOrderCommand OK!");
    });
  }
}
