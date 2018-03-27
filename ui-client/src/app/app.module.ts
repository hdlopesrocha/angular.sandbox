import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppComponent} from './app.component';
import {Api} from './service/api.service';
import {RegisterModalComponent} from './components/register-modal/register-modal.component';
import {LoginModalComponent} from './components/login-modal/login-modal.component';
import {FormsModule} from '@angular/forms';
import {CarouselComponent, CarouselModule, ModalModule, PopoverModule, TooltipModule} from 'ngx-bootstrap';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {MyHttpInterceptor} from './interceptor/http.interceptor';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CartPopoverComponent } from './components/cart-popover/cart-popover.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import {CartService} from './service/cart.service';
import { CheckoutAddressComponent } from './components/address-card/address-card.component';
import { ProductsComponent } from './pages/products/products.component';
import { FullscreenGalleryComponent } from './components/fullscreen-gallery/fullscreen-gallery.component';
import { AddressModalComponent } from './components/address-modal/address-modal.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'products', component: ProductsComponent}
];



@NgModule({
  declarations: [
    AppComponent,
    LoginModalComponent,
    RegisterModalComponent,
    CartPopoverComponent,
    CartDetailsComponent,
    ProductCardComponent,
    CheckoutComponent,
    HomeComponent,
    CheckoutAddressComponent,
    ProductsComponent,
    FullscreenGalleryComponent,
    AddressModalComponent
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
    Api
  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      multi: true
    },
    CartService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginModalComponent,
    RegisterModalComponent,
    AddressModalComponent,
    FullscreenGalleryComponent,
    CarouselComponent,
  ]
})
export class AppModule {
}
