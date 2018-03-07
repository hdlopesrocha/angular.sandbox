import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { Api } from './api/api';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    ModalModule.forRoot(),
    FormsModule,
    HttpClientModule,
    BrowserModule,
    Api
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AppModule { }
