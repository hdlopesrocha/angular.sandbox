import { Component, OnInit } from '@angular/core';
import {Api} from '../api/api';
import {Address} from '../api/user';

export class EditableAddress extends Address{
  constructor(public edit: boolean) {
    super();
  }
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public addresses: EditableAddress[];

  constructor(private api: Api) { }

  ngOnInit() {
    this.api.getAddresses().subscribe(list => {
      this.addresses = [];
      list.forEach((address: EditableAddress) => {
        address.edit = false;
        this.addresses.push(address);
      });
    });
  }

  addNewAddress(){
    this.addresses.push(new EditableAddress(true));
  }

  onAddressDeleted(address: EditableAddress){
    this.addresses.splice(this.addresses.indexOf(address), 1);
  }
}
