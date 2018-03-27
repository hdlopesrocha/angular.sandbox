import { Component, OnInit } from '@angular/core';
import {Api} from '../../service/api.service';
import {Address} from '../../api/user';
import {AddressModalComponent} from "../../components/address-modal/address-modal.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public addresses: Address[];
  private addressModalRef: BsModalRef;

  constructor(private api: Api, public modalService: BsModalService) { }

  ngOnInit() {
    document.body.style.backgroundImage = 'url(http://localhost:8080/api/public/file/background_blur.jpg)';
    this.api.getAddresses().subscribe(list => {
      this.addresses = list;
    });
  }

  addNewAddress(){
    this.addressModalRef = this.modalService.show(AddressModalComponent, {
      initialState: {
        address: new Address()
      }
    });
  }

  onAddressDeleted(address: Address){
    this.addresses.splice(this.addresses.indexOf(address), 1);
  }
}
