import { Injectable, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { finalize, tap, map } from 'rxjs/operators';
import { HttpBackendClient } from './http-backend.client';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { RefreshService } from './refresh.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private sub = new Subscription();

  private currentUserSubject = new ReplaySubject<User>(1);
  currentUser$: Observable<User> = this.currentUserSubject;

  constructor(
    private apiService: ApiService,
    private refreshService: RefreshService
  ) {
    this.sub.add(this.refreshService.refreshed$.subscribe(
      (user: User) => this.currentUserSubject.next(user)
    ));
  }

  private attemptStartRefreshLoop = tap(
    (user: User) => {
      this.refreshService.restartRefreshLoop();
      this.currentUserSubject.next(user);
    },
    (err) => {
      this.refreshService.stopRefreshLoop();
      this.currentUserSubject.next(null);
    }
  );

  private stopRefreshLoop = tap(
    (resp: { message: string }) => {
      this.refreshService.stopRefreshLoop();
      this.currentUserSubject.next(null);
    },
    (err) => {
      this.refreshService.stopRefreshLoop();
      this.currentUserSubject.next(null);
    }
  );

  // doesn't get back new token, dont touch refresh timer.
  // the token you get back could be close to expiry and close to refresh.
  getUser() {
    return this.apiService.get('/me').pipe(
      tap(
        (user: User) => this.currentUserSubject.next(user),
        (err) => this.currentUserSubject.next(null)
      )
    );
  }

  createUser(email, password) {
    return this.apiService.post('/me', {email, password})
      .pipe(this.attemptStartRefreshLoop);
  }

  logIn(email, password) {
    return this.apiService.post('/me/login', {email, password})
      .pipe(this.attemptStartRefreshLoop);
  }

  logout() {
    return this.apiService.patch('/me/logout').pipe(this.stopRefreshLoop);
  }

  logoutAll() {
    return this.apiService.delete('/me/logout').pipe(this.stopRefreshLoop);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
