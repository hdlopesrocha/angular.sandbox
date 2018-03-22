import { Component, OnInit } from '@angular/core';
import {Product} from '../api/user';
import {Api} from '../api/api';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public products: Product[];

  constructor(private api: Api, translate: TranslateService) {
    this.api.getProducts([]).subscribe(list => {
      this.products = list;
    });
  }

  ngOnInit() {

  }

}
