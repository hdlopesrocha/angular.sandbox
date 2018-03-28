import {EventEmitter, Injectable, Input, OnInit, Output} from '@angular/core';
import {Address} from '../api/user';

@Injectable()
export class AddressService implements  OnInit {

  public address: Address;
  @Output()
  public addressChanged: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
  }

}
