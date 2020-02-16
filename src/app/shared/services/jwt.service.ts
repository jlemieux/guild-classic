import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private readonly tokenName: string = 'jwtToken';

  getToken(): string {
    return window.localStorage.getItem(this.tokenName);
  }

  saveToken(token: string): void {
    window.localStorage.setItem(this.tokenName, token);
  }

  destroyToken(): void {
    window.localStorage.removeItem(this.tokenName);
  }

}
