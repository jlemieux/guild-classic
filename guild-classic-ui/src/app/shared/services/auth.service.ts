import { Injectable, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { finalize, tap, map } from 'rxjs/operators';
import { HttpBackendClient } from './http-backend.client';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { RefreshService } from './refresh.service';
import { ApiService } from './api.service';


// export interface AuthResponseData {
//   idToken: string;
//   email: string;
//   refreshToken: string;
//   expiresIn: string;
//   localId: string;
//   registered?: boolean;
// }


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  /*
  i want an observable. i want to sub to it.
  
  if there is a user with a token, i want to get it back instantly.

  if there is not, want to wait and try and get one.
    if I got one back, it would go the same as if i got one instantly.
    if HttpError (no cookie or invalid cookie), treat as no user.

  */

  private sub = new Subscription();

  private currentUserSubject = new ReplaySubject<User>(1);
  currentUser$: Observable<User> = this.currentUserSubject;

  //private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  //isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject;

  constructor(
    private apiService: ApiService,
    private refreshService: RefreshService
  ) {
    this.sub.add(this.refreshService.refreshed$.subscribe(
      (user: User) => this.currentUserSubject.next(user)
    ));
  }


  createUser(email, password) {
    return this.apiService.post('/me', {email, password}).pipe(
      tap((user: User) => {
        this.currentUserSubject.next(user);
        this.refreshService.restartRefreshLoop();
      })
    );
  }

  logIn(email, password) {
    return this.apiService.post('/me/login', {email, password}).pipe(
      tap((user: User) => {
        this.currentUserSubject.next(user);
        this.refreshService.restartRefreshLoop();
      })
    );
  }

  getUser() {
    return this.apiService.get('/me').pipe(
      tap((user: User) => this.currentUserSubject.next(user))
    );
  }

  logout() {
    return this.apiService.patch('/me/logout').pipe(
      tap((resp: {message: string}) => {
        console.log("sending out null user subject");
        this.currentUserSubject.next(null);
        console.log("calling stopRefreshLoop()");
        this.refreshService.stopRefreshLoop();
      })
    );
  }

  logoutAll() {
    return this.apiService.delete('/me/logout').pipe(
      tap((resp: {message: string}) => {
        this.currentUserSubject.next(null);
        this.refreshService.stopRefreshLoop();
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  // populate() {
  //   if (this.jwtService.getToken() !== null) {
  //     this.apiService.get('/user').subscribe(
  //       data => this.setAuth(data.user),
  //       err => this.purgeAuth()
  //     );
  //   }
  //   else {
  //     this.purgeAuth();
  //   }
  // }

  // setAuth(user: User) {
  //   this.jwtService.saveToken(user.token);
  //   this.currentUserSubject.next(user);
  //   //this.isAuthenticatedSubject.next(true);
  // }

  // purgeAuth() {
  //   this.jwtService.destroyToken();
  //   this.currentUserSubject.next({} as User);
  //   //this.isAuthenticatedSubject.next(false);
  // }

  // attemptAuth(type: string, credentials: Object): Observable<User> {
  //   const path = (type === 'login') ? '/login' : '';
  //   return this.apiService.post(
  //     '/users' + path,
  //     {
  //       user: credentials
  //     }
  //   ).pipe(
  //     tap(user => this.setAuth(user))
  //   );
  // }

  // update(user: User): Observable<User> {
  //   return this.apiService.put(
  //     '/user',
  //     {
  //       user
  //     }
  //   )
  // }


  /*
  user = new BehaviorSubject<User>(null);
  user2 = this.user
  private tokenExpireTimer: any;
  //private apiKey = 'AIzaSyDeBfxYAGcJu7z_i6B4zd_-LYk-IoOtTYU';
  //private apiSignupUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;
  //private apiSigninUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      this.apiSignupUrl,
      {email: email, password: password, returnSecureToken: true}
    ).pipe(
      catchError(this.handleError),
      tap(respData => {
        this.handleAuthentication(respData);
      })
    );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpireTimer) {
      clearTimeout(this.tokenExpireTimer);
    }
  }

  autoLogout(msUntilExpire: number) {
    this.tokenExpireTimer = setTimeout(() => {
      this.logout();
    }, msUntilExpire);
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      const expiresIn: number =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.user.next(loadedUser);
      this.autoLogout(expiresIn);
    }
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      this.apiSigninUrl,
      {email: email, password: password, returnSecureToken: true}
    ).pipe(
      catchError(this.handleError),
      tap(respData => {
        this.handleAuthentication(respData);
      })
    );
  }

  private handleAuthentication(respData: AuthResponseData) {
    const expirationDate = new Date(new Date().getTime() + +respData.expiresIn * 1000);
    const user = new User(respData.email, respData.localId, respData.idToken, expirationDate);
    this.user.next(user);
    this.autoLogout(+respData.expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorResp: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred!";
    if (!errorResp.error || !errorResp.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResp.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists!';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'User auth is currently disabled';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'Too many auth attempts! Try again later.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Account credentials do not match our records!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Account credentials do not match our records!';
        break;
      case 'USER_DISABLED':
        errorMessage = 'This account has been disabled!';
        break;
    }
    return throwError(errorMessage);
  }
  */
}
