import { Component, OnInit } from '@angular/core';
import {Api} from '../api/api';
import {Address} from '../api/user';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public addresses: Address[];

  constructor(private api: Api) { }

  ngOnInit() {
    this.api.getAddresses().subscribe(list => {
      this.addresses = list;
    });
  }

}
