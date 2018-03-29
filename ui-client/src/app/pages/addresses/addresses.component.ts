import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../service/api.service';
import {Address} from '../../api/user';
import {AddressModalComponent} from "../../components/address-modal/address-modal.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {AddressService} from "../../service/address.service";

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {
  public addresses: Address[];
  private addressModalRef: BsModalRef;

  constructor(private api: ApiService, public addressService: AddressService, public modalService: BsModalService) { }

  ngOnInit() {
    document.body.style.backgroundImage = 'url(http://localhost:8080/api/public/file/background_blur.jpg)';

    this.loadAdresses();
    this.addressService.addressChanged.subscribe(() => {
      this.loadAdresses();
    });
  }

  loadAdresses() {
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
