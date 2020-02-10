import { Component, OnInit, OnDestroy } from '@angular/core';
import { GuildsService } from '../shared/services/guilds.service';
import { Guild } from '../shared/models/guild.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-guilds',
  templateUrl: './guilds.component.html',
  styleUrls: ['./guilds.component.css']
})
export class GuildsComponent implements OnInit, OnDestroy {

  guilds: Guild[];
  sub: Subscription;

  constructor(
    private guildsService: GuildsService
  ) {}

  ngOnInit() {
    this.guilds = this.guildsService.getGuilds();
    this.sub = this.guildsService.guildsChanged.subscribe((guilds: Guild[]) => {
      this.guilds = guilds;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
