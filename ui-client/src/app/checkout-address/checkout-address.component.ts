import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EditableAddress} from "../checkout/checkout.component";
import {Api} from "../service/api.service";
import {Bill, Country, Currency} from "../api/user";
import {CartService} from "../service/cart.service";

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

  constructor(private api: Api, private cartService: CartService) {
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
    const bill = new Bill();
    bill.address = this.address;
    bill.currency = Currency.EUR;
    bill.cart = this.cartService.getLocalCart();

    this.api.createBill(bill).subscribe(() => {
      console.log("BILL OK!");
    });
  }

  editAddress() {
    this.address.edit = true;
  }
}
