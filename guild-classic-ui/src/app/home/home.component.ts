import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GuildListParams } from '../shared/models/guild-list-params.model';
import { CharacterListParams } from '../shared/models/character-list-params.model';
import { exhaustMap, tap, map } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/user.model';
import { of, EMPTY, Observable } from 'rxjs';
import { JwtService } from '../shared/services/jwt.service';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: {
    email: string,
    token: string,
    devices: number
  };

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService
  ) {}

  ngOnInit() {

  }

  testCreateUser() {
    this.apiService.post('/me', {email: 'client@email.com', password: 'mytestpass'}).subscribe(resp => {
      console.log(resp);
      this.user = resp;
      this.jwtService.saveToken(resp.token);
    });
  }

  testLogIn() {
    this.apiService.post('/me/login', {email: 'client@email.com', password: 'mytestpass'}).subscribe(resp => {
      console.log(resp);
      this.user = resp;
      this.jwtService.saveToken(resp.token);
    });
  }


  testGetUser() {
    this.apiService.get('/me').subscribe(resp => {
      console.log(resp);
      this.user = resp;
      this.jwtService.saveToken(resp.token);
    });
  }

  testRefresh() {
    this.apiService.post('/me/refresh').subscribe(resp => {
      console.log(resp);
      this.user = resp;
      this.jwtService.saveToken(resp.token);
    });
  }

  testLogout() {
    this.apiService.patch('/me/logout').subscribe(resp => {
      console.log(resp);
      this.user = undefined;
      this.jwtService.destroyToken();
    });
  }

  testLogoutAll() {
    this.apiService.delete('/me/logout').subscribe(resp => {
      console.log(resp);
      this.user = undefined;
      this.jwtService.destroyToken();
    });
  }

  // currentUser: User;
  // guildListParams: GuildListParams = {} as GuildListParams;
  // characterListParams: CharacterListParams = {} as CharacterListParams;
  // isPersonal: boolean;

  // constructor(
  //   private route: ActivatedRoute
  // ) { }

  // ngOnInit() {
  //   this.route.data.pipe(
  //     map(data => data.user)
  //   ).subscribe((user: User) => {
  //     this.currentUser = user;
  //     this.isPersonal = !!user.token;
  //   });
  // }

  // personal() {
  //   this.isPersonal = true;
  //   this.guildListParams.hasUser = this.currentUser.username;
  //   this.characterListParams.owner = this.currentUser.username;
  // }

  // all() {
  //   this.isPersonal = false;
  //   this.guildListParams = {} as GuildListParams;
  //   this.characterListParams = {} as CharacterListParams;
  // }

}
