import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {ApiService} from './service/api.service';
import {RegisterModalComponent} from './components/register-modal/register-modal.component';
import {LoginModalComponent} from './components/login-modal/login-modal.component';
import {FormsModule} from '@angular/forms';
import {CarouselComponent, CarouselModule, ModalModule, PopoverModule, TooltipModule} from 'ngx-bootstrap';
import {MyHttpInterceptor} from './interceptor/http.interceptor';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {CartPopoverComponent} from './components/cart-popover/cart-popover.component';
import {ProductCardComponent} from './components/product-card/product-card.component';
import {CheckoutComponent} from './pages/checkout/checkout.component';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {CartService} from './service/cart.service';
import {CheckoutAddressComponent} from './components/address-card/address-card.component';
import {ProductsComponent} from './pages/products/products.component';
import {FullscreenGalleryComponent} from './components/fullscreen-gallery/fullscreen-gallery.component';
import {AddressModalComponent} from './components/address-modal/address-modal.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {AddressesComponent} from "./pages/addresses/addresses.component";
import {ConfirmOrderComponent} from './pages/confirm-order/confirm-order.component';
import {AddressService} from "./service/address.service";
import { PaymentChoiceComponent } from './pages/payment-choice/payment-choice.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'addresses', component: AddressesComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'payment', component: PaymentChoiceComponent},
  {path: 'confirm', component: ConfirmOrderComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AddressesComponent,
    LoginModalComponent,
    RegisterModalComponent,
    CartPopoverComponent,
    ProductCardComponent,
    CheckoutComponent,
    HomeComponent,
    CheckoutAddressComponent,
    ProductsComponent,
    FullscreenGalleryComponent,
    AddressModalComponent,
    ConfirmOrderComponent,
    PaymentChoiceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {useHash: true}),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    CarouselModule.forRoot(),
    PopoverModule.forRoot(),
    BsDropdownModule.forRoot(),
    AngularFontAwesomeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http) => {
          return new TranslateHttpLoader(http, './assets/i18n/', '.json');
        },
        deps: [HttpClient]
      }
    }),
    FormsModule,
    ApiService
  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      multi: true
    },
    CartService,
    AddressService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddressesComponent,
    LoginModalComponent,
    RegisterModalComponent,
    AddressModalComponent,
    FullscreenGalleryComponent,
    CarouselComponent,
  ]
})
export class AppModule {
}
