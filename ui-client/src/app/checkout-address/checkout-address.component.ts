import {Component, Input, OnInit} from '@angular/core';
import {Address} from '../api/user';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.css']
})
export class CheckoutAddressComponent implements OnInit {

  @Input()
  public address: Address;

  constructor() { }

  ngOnInit() {
  }

}
