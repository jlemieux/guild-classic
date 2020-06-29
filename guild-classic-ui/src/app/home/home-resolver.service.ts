import { Injectable } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class HomeResolverService implements Resolve<User> {

  constructor(
    private authService: AuthService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User> {

    return this.authService.currentUser$.pipe(take(1));

  }
}
