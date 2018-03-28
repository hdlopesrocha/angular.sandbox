import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../service/api.service";
import {Address} from "../../api/user";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {AddressModalComponent} from "../address-modal/address-modal.component";
import {Router} from "@angular/router";
import {AddressService} from "../../service/address.service";

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
  private addressModalRef: BsModalRef;

  constructor(private api: ApiService, private addressService: AddressService, public modalService: BsModalService, public router: Router) {
  }

  ngOnInit() {
  }

  useAddress() {
    this.addressService.address = this.address;
    this.router.navigate(['/confirm']);
  }

  editAddress() {
    this.addressModalRef = this.modalService.show(AddressModalComponent, {
      initialState: {
        address:  Object.assign({}, this.address)
      }
    });
  }
}
