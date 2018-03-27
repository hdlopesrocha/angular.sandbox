import { Component, OnInit } from '@angular/core';
import {Product} from '../../api/user';
import {Api} from '../../service/api.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products: Product[];

  constructor(private api: Api, translate: TranslateService) {
    this.api.getProducts([]).subscribe(list => {
      this.products = list;
    });
  }

  ngOnInit() {
    document.body.style.backgroundImage = 'url(http://localhost:8080/api/public/file/background_blur.jpg)';
  }

}
