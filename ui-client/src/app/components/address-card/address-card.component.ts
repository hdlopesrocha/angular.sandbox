import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Api} from "../../service/api.service";
import {Address} from "../../api/user";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {AddressModalComponent} from "../address-modal/address-modal.component";
import {Router} from "@angular/router";

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

  constructor(private api: Api, public modalService: BsModalService, public router: Router) {
  }

  ngOnInit() {
  }

  useAddress() {
    this.router.navigate(['/confirm', { address: this.address }]);
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
