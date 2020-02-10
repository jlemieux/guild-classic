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
  // guilds: Guild[] = [
  //   new Guild("Dream Team"),
  //   new Guild("Guild B"),
  //   new Guild("Dingos")
  // ];

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

  addGuild(guild: Guild) {
    this.guilds.push(guild);
    this.guildsChanged.next(this.guilds.slice());
  }

  removeGuild(index: number) {
    this.guilds.splice(index, 1);
    this.guildsChanged.next(this.guilds.slice());
  }

  fetchGuilds() {
    return this.http.get<Guild[]>(this.guildsUrl).pipe(
      map(guilds => {
        return guilds === null ? [] : guilds;
      }),
      tap(guilds => {
        this.setGuilds(guilds);
      })
    );
  }

  storeGuilds() {
    this.http.put(this.guildsUrl, this.getGuilds()).subscribe(resp => {
      console.log(resp)
    });
  }
}
