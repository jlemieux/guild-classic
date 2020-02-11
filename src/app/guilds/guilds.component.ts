import { Component, OnInit, OnDestroy } from '@angular/core';
import { GuildsService } from './guilds.service';
import { Guild } from '../guild/guild.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-guilds',
  templateUrl: './guilds.component.html',
  styleUrls: ['./guilds.component.css']
})
export class GuildsComponent implements OnInit, OnDestroy {

  guilds: Guild[];
  private sub: Subscription;

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

  onDeleteGuild(guild: Guild) {
    this.guildsService.deleteGuild(guild.id).subscribe(
      deleteResp => {
        console.log("Guild deleted!");
      },
      errorMessage => {
        console.log(errorMessage);
      }
    );
  }

}
