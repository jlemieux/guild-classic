import { Injectable } from '@angular/core';
import { Guild } from '../models/guild.model';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GuildsService {

  guildsChanged = new Subject<Guild[]>();
  private guilds: Guild[] = [];

  private guildsUrl = 'https://guild-classic.firebaseio.com/guilds.json';

  constructor(
    private http: HttpClient
  ) { }

  setGuilds(guilds: Guild[]) {
    this.guilds = guilds;
    this.guildsChanged.next(this.guilds.slice());
  }

  getGuilds() {
    return this.guilds.slice();
  }

  getGuild(id: string) {
    return this.guilds.find(guild => guild.id === id);
  }

  addGuild(guild: Guild) {
    this.guilds.push(guild);
    this.guildsChanged.next(this.guilds.slice());
  }

  removeGuild(index: number) {
    this.guilds.splice(index, 1);
    this.guildsChanged.next(this.guilds.slice());
  }

  fetchGuilds() {
    return this.http.get<{[id: string]: Guild}>(this.guildsUrl).pipe(
      map(guilds => {
        if (guilds === null) {
          return [];
        }
        const fetchedGuilds = [];
        for (let id in guilds) {
          fetchedGuilds.push(new Guild(guilds[id].name, id));
        }
        return fetchedGuilds;
      }),
      tap(guilds => {
        this.setGuilds(guilds);
      })
    );
  }

  storeGuilds() {
    return this.http.put(this.guildsUrl, this.getGuilds());
  }

  storeGuild(guildName: string) {
    return this.http.post<{name: string}>(
      this.guildsUrl,
      {name: guildName}
    );
  }
}
