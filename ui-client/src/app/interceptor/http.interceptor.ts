import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import {ApiService} from '../service/api.service';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  constructor(public api: ApiService) { }

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
        if (error.status === 401) {

        }
        else {
          console.error('ERROR_API', request, error);
        }
      }
    });

  }
}
