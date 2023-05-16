import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class OmniInterceptorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getJWTToken();
    req = req.clone({
      url:  req.url,
      setHeaders: {
        Authorization: `${token}`
      }
    });
    return next.handle(req); 
  }
}
