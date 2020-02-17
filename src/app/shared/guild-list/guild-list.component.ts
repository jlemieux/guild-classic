import { Component, OnInit, Input } from '@angular/core';
import { GuildsService } from '../services/guilds.service';
import { GuildListParams } from '../models/guild-list-params.model';
import { Guild } from 'src/app/guild/guild.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-guild-list',
  templateUrl: './guild-list.component.html',
  styleUrls: ['./guild-list.component.css']
})
export class GuildListComponent implements OnInit {

  @Input() params: GuildListParams = {};
  guilds$: Observable<Guild[]>;

  constructor(
    private guildsService: GuildsService
  ) { }

  ngOnInit(): void {
    this.guilds$ = this.guildsService.getGuilds(this.params);
  }

  /*

  trying out async pipe. can swap back to this. this is fine.

  @Input() params: GuildListParams = {};
  guilds: Guild[] = [];
  isLoading = true;

  constructor(
    private guildsService: GuildsService
  ) { }

  ngOnInit(): void {
    this.getGuilds();
  }

  getGuilds() {
    this.isLoading = true;
    this.guildsService.getGuilds(this.params).subscribe(data => {
      this.guilds = data.guilds;
      this.isLoading = false;
    });
    // could handle err => from subscribe to inform user of not loading. else just spinner forever.
  }
  */

}
