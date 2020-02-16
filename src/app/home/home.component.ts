import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GuildListParams } from '../shared/models/guild-list-params.model';
import { CharacterListParams } from '../shared/models/character-list-params.model';
import { exhaustMap, tap } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/user.model';
import { of, EMPTY } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAuthenticated: boolean;
  currentUser: User;
  guildListParams: GuildListParams = {};
  characterListParams: CharacterListParams = {};

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.data.pipe(
      exhaustMap((data: { isAuth: boolean }) => {
        this.isAuthenticated = data.isAuth;
        return this.authService.currentUser$.pipe(
          tap(user => {
            if (this.isAuthenticated) {
              this.guildListParams.hasUser = user.username;
              this.characterListParams.owner = user.username;
            }
          })
        );
      })
    ).subscribe(user => {
      this.currentUser = user;
    });
  }

}
