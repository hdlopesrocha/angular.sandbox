import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Address, Country, SaveAddressCommand} from "../../api/user";
import {Api} from "../../service/api.service";
import {BsModalRef} from "ngx-bootstrap";

@Component({
  selector: 'app-address-modal',
  templateUrl: './address-modal.component.html',
  styleUrls: ['./address-modal.component.css']
})
export class AddressModalComponent implements OnInit {
  @Input()
  public address: Address;
  @Input()
  private addressChanged: EventEmitter<boolean>;

  private countries: Country[];

  constructor(private api: Api, public modal: BsModalRef) { }

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
      this.addressChanged.emit(true);
    });
  }
}
