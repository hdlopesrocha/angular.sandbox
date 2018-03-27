import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Api} from "../../service/api.service";
import {Address, Country, CreateOrderCommand, Currency, SaveAddressCommand} from "../../api/user";
import {CartService} from "../../service/cart.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {AddressModalComponent} from "../address-modal/address-modal.component";

@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.css']
})
export class CheckoutAddressComponent implements OnInit {

  @Input()
  public address: Address;
  @Input()
  public selectable: boolean;
  @Output()
  private deleteAddressEvent = new EventEmitter<Address>();
  private addressModalRef: BsModalRef;
  @Input()
  private addressChanged: EventEmitter<boolean>;

  constructor(private api: Api, private cartService: CartService, public modalService: BsModalService) {
  }

  ngOnInit() {
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

  useAddress() {
    const command = new CreateOrderCommand();
    command.address = this.address;
    command.currency = Currency.EUR;
    command.cart = this.cartService.getLocalCart();

    this.api.createOrder(command).subscribe(() => {
      console.log("CreateOrderCommand OK!");
    });
  }

  editAddress() {
    this.addressModalRef = this.modalService.show(AddressModalComponent, {
      initialState: {
        address:  Object.assign({}, this.address),
        addressChanged: this.addressChanged
      }
    });
  }
}
