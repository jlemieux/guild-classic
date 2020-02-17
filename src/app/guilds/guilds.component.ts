import { Component, OnInit, OnDestroy } from '@angular/core';
import { GuildsService } from '../shared/services/guilds.service';
import { Guild } from '../guild/guild.model';
import { Subscription } from 'rxjs';
import { CharactersService } from '../shared/services/characters.service';

@Component({
  selector: 'app-guilds',
  templateUrl: './guilds.component.html',
  styleUrls: ['./guilds.component.css']
})
export class GuildsComponent implements OnInit, OnDestroy {

  guilds: Guild[];
  private sub: Subscription;

  constructor(
    private guildsService: GuildsService,
    private charactersService: CharactersService
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
    this.guildsService.deleteGuild(guild).subscribe(
      deleteResp => {
        console.log("Guild deleted!");
        console.log(JSON.stringify(deleteResp));
      },
      errorMessage => {
        console.log(errorMessage);
      }
    );
  }

  getOwner(guild: Guild) {
    console.log("getting owner of this guild: " + JSON.stringify(guild));
    return this.charactersService.getCharacter(guild.ownerId);
  }

}
