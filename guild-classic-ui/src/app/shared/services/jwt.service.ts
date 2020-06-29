import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  //private readonly tokenName: string = 'jwtToken';
  private token: string;

  getToken(): string {
    //return window.localStorage.getItem(this.tokenName);
    return this.token;
  }

  saveToken(token: string): void {
    //window.localStorage.setItem(this.tokenName, token);
    this.token = token;
  }

  destroyToken(): void {
    //window.localStorage.removeItem(this.tokenName);
    this.token = undefined;
  }

}
