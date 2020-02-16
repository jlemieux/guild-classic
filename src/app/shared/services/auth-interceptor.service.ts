import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { JwtService } from './jwt.service';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private jwtService: JwtService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    const token = this.jwtService.getToken();
    if (token) {
      headersConfig['Authorization'] = `Token ${token}`;
    }
    req = req.clone({ setHeaders: headersConfig });
    return next.handle(req);
  }
}
