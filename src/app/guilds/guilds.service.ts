import { Injectable } from '@angular/core';
import { Guild } from '../guild/guild.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GuildsService {

  guildsChanged = new Subject<Guild[]>();
  private guilds: Guild[] = [];

  private guildsUrl = 'https://guild-classic.firebaseio.com/guilds.json';
  private deleteGuildUrl = 'https://guild-classic.firebaseio.com/guilds/';

  constructor(
    private http: HttpClient
  ) { }

  getGuild(id: string) {
    return this.guilds.find(guild => guild.id === id);
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
        if (fetchedGuilds === null) {
          return [];
        }
        const guilds = [];
        for (let id in fetchedGuilds) {
          guilds.push(new Guild(fetchedGuilds[id].name, id));
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
    this.guildsChanged.next(this.guilds.slice());
  }

  addGuild(guildName: string) {
    return this.http.post<{name: string}>(
      this.guildsUrl,
      {name: guildName}
    ).pipe(
      catchError(this.handleError),
      tap(addResp => {
        const guild = new Guild(guildName, addResp.name);
        this._addGuild(guild);
      })
    );
  }

  private _addGuild(guild: Guild) {
    this.guilds.push(guild);
    this.guildsChanged.next(this.guilds.slice());
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

  private _deleteGuild(id: string) {
    //this.guilds.splice(index, 1);
    this.guilds = this.guilds.filter(guild => guild.id !== id);
    this.guildsChanged.next(this.guilds.slice());
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
