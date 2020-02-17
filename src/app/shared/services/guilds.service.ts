import { Injectable } from '@angular/core';
import { Guild } from '../../guild/guild.model';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { map, tap, catchError, mergeMap } from 'rxjs/operators';
import { Subject, throwError, Observable } from 'rxjs';
import { CharactersService } from './characters.service';
import { Character } from '../../character/character.model';
import { GuildCreateFormInfo } from '../../guilds/guild-create/guild-create.component';
import { ApiService } from './api.service';
import { GuildListParams } from '../models/guild-list-params.model';


// export interface GuildResponse {
//   name: string;
//   ownerId: string;
// }


@Injectable({
  providedIn: 'root'
})
export class GuildsService {

  constructor(
    private apiService: ApiService
  ) { }

  getGuilds(params: GuildListParams): Observable<Guild[]> {
    return this.apiService.get(
      '/guilds',
      new HttpParams({ fromObject: params as {} })
    );
  }

  getGuild(slug: string): Observable<Guild> {
    return this.apiService.get(`/guilds/${slug}`);
  }

  //TODO: unknown delete return type yet
  destroy(slug: string): Observable<Object> {
    return this.apiService.delete(`/guilds/${slug}`);
  }

  save(guild: Guild): Observable<Guild> {
    if (guild.slug) {  // edit existing guild
      return this.apiService.put(`/guilds/${guild.slug}`, guild);
    }
    else {  // new guild
      return this.apiService.post('/guilds', guild);
    }
  }

  

  /*
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
    return this.http.get<{[id: string]: GuildResponse}>(
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

  createGuild(guildInfo: GuildCreateFormInfo) {
    return this.http.post<{name: string}>(
      this.guildsUrl,
      guildInfo
    ).pipe(
      catchError(this.handleError),
      mergeMap(addResp => {
        const guildId = addResp.name;
        const guild = new Guild(guildInfo.name, guildId, guildInfo.ownerId);
        this._createGuild(guild);
        return this.charactersService.assignGuildToCharacter(guildInfo.ownerId, guildId);
      })
    );
  }

  private _createGuild(guild: Guild) {
    this.guilds.push(guild);
    this.guildsChanged.next(this.getGuilds());
  }

  deleteGuild(guild: Guild) {
    return this.http.delete<null>(
      `${this.deleteGuildUrl}${guild.id}.json`
    ).pipe(
      catchError(this.handleError),
      tap(deleteResp => {
        this._deleteGuild(guild.id);
      }),
      mergeMap(deleteResp => {
        return this.charactersService.removeGuildFromMembers(guild);
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
  */
}
