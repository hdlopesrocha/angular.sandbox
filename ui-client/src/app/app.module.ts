import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppComponent} from './app.component';
import {Api} from './api/api';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {CarouselComponent, CarouselModule, ModalModule, PopoverModule, TooltipModule} from 'ngx-bootstrap';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {MyHttpInterceptor} from './interceptor/http.interceptor';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CartPopoverComponent } from './cart-popover/cart-popover.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import {CartService} from './service/cart.service';
import { CheckoutAddressComponent } from './checkout-address/checkout-address.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'products', component: ProductListComponent}
];



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CartPopoverComponent,
    CartDetailsComponent,
    ProductCardComponent,
    CheckoutComponent,
    HomeComponent,
    CheckoutAddressComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {useHash: true}),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    CarouselModule.forRoot(),
    PopoverModule.forRoot(),
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
    LoginComponent,
    RegisterComponent,
    CarouselComponent,
  ]
})
export class AppModule {
}
