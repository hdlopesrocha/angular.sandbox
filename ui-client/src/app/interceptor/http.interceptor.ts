import { Injectable, Injector } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import {Api} from '../service/api.service';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  constructor(public api: Api) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.api.getToken()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.api.getToken()}`
        },
        withCredentials: true
      });
    }

    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
      }
    }, (error: any) => {
      if (error instanceof HttpErrorResponse) {
        console.error('ERROR_API', request, error);
        if (error.status === 401) {
        }
      }
    });

  }
}
