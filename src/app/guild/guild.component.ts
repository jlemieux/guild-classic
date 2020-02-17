import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Guild } from './guild.model';
import { GuildsService } from '../shared/services/guilds.service';
import { CharactersService } from '../shared/services/characters.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.css']
})
export class GuildComponent implements OnInit {

  guild$: Observable<Guild>;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.guild$ = this.route.data.pipe(map(data => data.guild));
  }

}
