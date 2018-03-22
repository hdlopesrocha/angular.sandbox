import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cart, Product} from '../api/user';
import {Api} from '../api/api';
import {CartService} from '../service/cart.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {LoginComponent} from '../login/login.component';
import {FullscreenGalleryComponent} from '../fullscreen-gallery/fullscreen-gallery.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input()
  public product: Product;
  public amount: number;
  public loginModalRef: BsModalRef;

  constructor(private api: Api, private cartService: CartService,
              public modalService: BsModalService) {
    this.amount = 1;
  }

  ngOnInit() {
  }

  submit() {
    this.api.getCart(this.cartService.getLocalCart()).subscribe(cart => {
      this.cartService.addToCart(cart, this.product.id, this.amount);
      this.cartService.updateCart(cart);
      this.api.setCart(cart);
    });
  }

  toggleFullScreen(product: Product) {
    const attachments = [];
    product.attachments.forEach(src => {
      attachments.push(this.api.host + '/api/public/file/' + src);
    });


    this.loginModalRef = this.modalService.show(FullscreenGalleryComponent, {
      initialState: {
        images: attachments
      }
    });

  }
}
