import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from "../services/authentication.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.userAuthenticationInfo.getValue()?.access_token === null || this.authService.userAuthenticationInfo.getValue()?.access_token === undefined)
      return next.handle(request);

    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.userAuthenticationInfo.getValue()?.access_token}`
      }
    });

    return next.handle(modifiedRequest);
  }
}
