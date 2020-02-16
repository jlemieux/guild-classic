import { Component, OnInit, Input } from '@angular/core';
import { GuildsService } from '../services/guilds.service';
import { GuildListParams } from '../models/guild-list-params.model';
import { Guild } from 'src/app/guild/guild.model';

@Component({
  selector: 'app-guild-list',
  templateUrl: './guild-list.component.html',
  styleUrls: ['./guild-list.component.css']
})
export class GuildListComponent implements OnInit {

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

}
