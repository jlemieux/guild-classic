import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GuildListParams } from '../shared/models/guild-list-params.model';
import { CharacterListParams } from '../shared/models/character-list-params.model';
import { exhaustMap, tap, map } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/user.model';
import { of, EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;
  guildListParams: GuildListParams = {} as GuildListParams;
  characterListParams: CharacterListParams = {} as CharacterListParams;
  isPersonal: boolean;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.pipe(
      map(data => data.user)
    ).subscribe((user: User) => {
      this.currentUser = user;
      this.isPersonal = !!user.token;
    });
  }

  personal() {
    this.isPersonal = true;
    this.guildListParams.hasUser = this.currentUser.username;
    this.characterListParams.owner = this.currentUser.username;
  }

  all() {
    this.isPersonal = false;
    this.guildListParams = {} as GuildListParams;
    this.characterListParams = {} as CharacterListParams;
  }

}
