import {Component, Input, OnInit} from '@angular/core';
import {Address, Country, SaveAddressCommand} from "../../api/user";
import {ApiService} from "../../service/api.service";
import {BsModalRef} from "ngx-bootstrap";
import {AddressService} from "../../service/address.service";

@Component({
  selector: 'app-address-modal',
  templateUrl: './address-modal.component.html',
  styleUrls: ['./address-modal.component.css']
})
export class AddressModalComponent implements OnInit {
  @Input()
  public address: Address;
  private countries: Country[];

  constructor(private api: ApiService, private addressService: AddressService, public modal: BsModalRef) { }

  ngOnInit() {
    this.countries = this.api.getCountries();
  }

  close() {
    this.modal.hide();
  }

  submit() {
    const command = new SaveAddressCommand();
    command.address = this.address;
    this.api.saveAddress(command).subscribe(() => {
      this.close();
      this.addressService.addressChanged.emit();
    });
  }

  delete() {
    if (this.address.id) {
      this.api.deleteAddress(this.address.id).subscribe(() => {
        this.close();
        this.addressService.addressChanged.emit();
      });
    }
  }

}
