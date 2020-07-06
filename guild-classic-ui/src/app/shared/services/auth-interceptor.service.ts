import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';
import { exhaustMap, take, switchMap, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const headersConfig = environment.requestHeaders;
    return this.authService.currentUser$.pipe(
      take(1),
      exhaustMap((user: User) => {
        if (user !== null) {
          headersConfig['Authorization'] = `Bearer ${user.token}`;
        }
        return next.handle(
          req.clone({ withCredentials: true, setHeaders: headersConfig })
        );
      })
    );
    
  }
}
