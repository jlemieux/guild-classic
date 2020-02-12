import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Guild } from './guild.model';
import { GuildsService } from '../guilds/guilds.service';
import { CharactersService } from '../characters/characters.service';

@Component({
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.css']
})
export class GuildComponent implements OnInit {

  guild: Guild;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private guildsService: GuildsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.guild = this.guildsService.getGuild(params['id']);
        if (this.guild === undefined) {
          this.router.navigateByUrl('/404', { skipLocationChange: true });
        }
      }
    );
  }

}
