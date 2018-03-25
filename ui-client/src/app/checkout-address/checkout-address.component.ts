import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EditableAddress} from "../checkout/checkout.component";
import {Api} from "../api/api";
import {Address, Country} from "../api/user";

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.css']
})
export class CheckoutAddressComponent implements OnInit {

  @Input()
  public address: EditableAddress;
  @Output()
  private deleteAddressEvent = new EventEmitter<EditableAddress>();
  private countries: Country[];

  constructor(private api: Api) {
  }

  ngOnInit() {
    this.countries = this.api.getCountries();
  }

  deleteAddress() {
    if (this.address.id) {
      this.api.deleteAddress(this.address.id).subscribe(() => {
        this.deleteAddressEvent.emit(this.address);
      });
    } else {
      this.deleteAddressEvent.emit(this.address);
    }
  }

  saveAddress() {
    this.address.edit = false;
    this.api.saveAddress(this.address).subscribe(() => {
    });
  }

  useAddress() {

  }

  editAddress() {
    this.address.edit = true;
  }
}
