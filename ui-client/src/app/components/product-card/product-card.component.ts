import {Component, Input, OnInit} from '@angular/core';
import {Product, SaveCartCommand} from '../../api/user';
import {Api} from '../../service/api.service';
import {CartService} from '../../service/cart.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
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
    this.api.getCart().subscribe(cart => {
      this.cartService.addToCart(cart, this.product.id, this.amount);
      this.cartService.updateCart(cart);
      const command = new SaveCartCommand();
      command.cart = cart;
      this.api.setCart(command);
    }, () => {
      const cart = this.cartService.getLocalCart();
      this.cartService.addToCart(cart, this.product.id, this.amount);
      this.cartService.updateCart(cart);
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