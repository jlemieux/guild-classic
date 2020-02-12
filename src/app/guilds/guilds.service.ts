import { Injectable } from '@angular/core';
import { Guild } from '../guild/guild.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { CharactersService } from '../characters/characters.service';
import { Character } from '../character/character.model';


@Injectable({
  providedIn: 'root'
})
export class GuildsService {

  guildsChanged = new Subject<Guild[]>();
  private guilds: Guild[] = [];

  private guildsUrl = 'https://guild-classic.firebaseio.com/guilds.json';
  private deleteGuildUrl = 'https://guild-classic.firebaseio.com/guilds/';

  constructor(
    private http: HttpClient,
    private charactersService: CharactersService
  ) { }


  getGuild(guildId: string) {
    return this.guilds.find(guild => guild.id === guildId);
  }

  getGuilds() {
    return this.guilds.slice();
  }

  fetchGuilds() {
    return this.http.get<{[id: string]: Guild}>(
      this.guildsUrl
    ).pipe(
      catchError(this.handleError),
      map(fetchedGuilds => {
        const guilds: Guild[] = [];
        for (let id in fetchedGuilds) {
          guilds.push(new Guild(fetchedGuilds[id].name, id, fetchedGuilds[id].ownerId));
        }
        return guilds;
      }),
      tap(guilds => {
        this.setGuilds(guilds);
      })
    );
  }

  private setGuilds(guilds: Guild[]) {
    this.guilds = guilds;
    this.guildsChanged.next(this.getGuilds());
  }

  createGuild(guildName: string, guildOwnerId: string) {
    return this.http.post<{name: string}>(
      this.guildsUrl,
      {name: guildName, owner: guildOwnerId}
    ).pipe(
      catchError(this.handleError),
      tap(addResp => {
        console.log("addResp in guild service create: " + addResp);
        const guildId = addResp.name;
        const guild = new Guild(guildName, guildId, guildOwnerId);
        this.charactersService.assignGuild(guildOwnerId, guildId);
        this._createGuild(guild);
      })
    );
  }

  private _createGuild(guild: Guild) {
    this.guilds.push(guild);
    this.guildsChanged.next(this.getGuilds());
  }

  deleteGuild(guildId: string) {
    return this.http.delete<null>(
      `${this.deleteGuildUrl}${guildId}.json`
    ).pipe(
      catchError(this.handleError),
      tap(deleteResp => {
        this._deleteGuild(guildId);
      })
    );
  }

  private _deleteGuild(guildId: string) {
    //this.guilds.splice(index, 1);
    this.guilds = this.guilds.filter(guild => guild.id !== guildId);
    this.guildsChanged.next(this.getGuilds());
  }

  private handleError(errorResp: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred!";
    // if (!errorResp.error || !errorResp.error.error) {
    //   return throwError(errorMessage);
    // }
    switch (errorResp.status) {
      case 400:
        errorMessage = 'Bad Request';
        break;
      case 401:
        errorMessage = 'Unauthorized';
        break;
      case 404:
        errorMessage = 'Not Found';
        break;
      case 500:
        errorMessage = 'Internal Server Error';
        break;
      case 503:
        errorMessage = 'Service Unavailable';
        break;
      case 412:
        errorMessage = 'Precondition Failed';
        break;
    }
    return throwError(errorMessage);
  }
}
