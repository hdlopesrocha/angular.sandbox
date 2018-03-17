import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppComponent} from './app.component';
import {Api} from './api/api';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {CarouselModule, ModalModule, PopoverModule, TooltipModule} from 'ngx-bootstrap';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {MyHttpInterceptor} from './api/http.interceptor';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AppModule {
}
