import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  private tokenExpireTimer: any;
  private apiKey = 'AIzaSyDeBfxYAGcJu7z_i6B4zd_-LYk-IoOtTYU';
  private apiSignupUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;
  private apiSigninUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;

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
}
