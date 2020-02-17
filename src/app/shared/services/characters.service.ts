import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, tap, map, mergeMap, filter } from 'rxjs/operators';
import { Character } from '../../character/character.model';
import { Subject, throwError, Observable } from 'rxjs';
import { CharacterCreateFormInfo } from '../../characters/character-create/character-create.component';
import { GuildsService } from './guilds.service';
import { Guild } from '../../guild/guild.model';
import { ApiService } from './api.service';
import { CharacterListParams } from '../models/character-list-params.model';

export interface CharacterResponse {
  name: string;
  server: string;
  gear: string;
  guildId?: string;
  raidId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(
    private apiService: ApiService
  ) { }

  getCharacters(params: CharacterListParams): Observable<Character[]> {
    return this.apiService.get(
      '/characters',
      new HttpParams({ fromObject: params as {} })
    );
  }

  getCharacter(slug: string): Observable<Character> {
    return this.apiService.get(`/characters/${slug}`);
  }

  destroy(slug: string): Observable<Object> {
    return this.apiService.delete(`/characters/${slug}`);
  }

  save(character: Character): Observable<Character> {
    if (character.slug) {
      return this.apiService.put(`/characters/${character.slug}`, character);
    }
    else {
      return this.apiService.post('/characters', character);
    }
  }
  /*
  charactersChanged = new Subject<Character[]>();
  private characters: Character[] = [];

  private charactersUrl = 'https://guild-classic.firebaseio.com/characters.json';
  private characterUrl = 'https://guild-classic.firebaseio.com/characters/';

  constructor(
    private http: HttpClient
  ) {}


  getGuildMembers(guild: Guild) {
    return this.getCharacters().filter(character => character.guildId === guild.id);
  }

  removeGuildFromMembers(guild: Guild) {
    const members = this.getGuildMembers(guild);
    const data = {};
    for (const member of members) {
      data[`${member.id}/guildId`] = null;
    }
    console.log("removing with this data: " + JSON.stringify(data));
    return this.http.patch<{[id: string]: CharacterResponse}>(
      this.charactersUrl,
      data
    ).pipe(
      catchError(this.handleError),
      tap(charResp => {
        this.setCharacters(this.characters.map(character => {
          if (character.id in charResp) {
            character.guildId = null;
          }
          return character;
        }));
      })
    );

  }

  assignGuildToCharacter(characterId: string, guildId: string) {
    return this.http.patch<{guildId: string}>(
      `${this.characterUrl}${characterId}.json`,
      {guildId: guildId}
    ).pipe(
      catchError(this.handleError),
      tap(addResp => {
        this.setCharacters(this.characters.map(character => {
          if (character.id === characterId) {
            character.guildId = guildId;
          }
          return character;
        }));
      })
    );
  }

  getCharacter(charId: string) {
    console.log("getting char with id: " + charId);
    return this.characters.find(character => character.id === charId);
  }

  getCharacters() {
    return this.characters.slice();
  }

  fetchCharacters() {
    return this.http.get<{[id: string]: CharacterResponse}>(
      this.charactersUrl
    ).pipe(
      catchError(this.handleError),
      map(fetchedChars => {
        // can be null. dont use map. do for in loop.
        const characters: Character[] = [];
        for (let characterId in fetchedChars) {
          characters.push(new Character(
            fetchedChars[characterId].name,
            fetchedChars[characterId].server,
            fetchedChars[characterId].gear,
            characterId,
            fetchedChars[characterId].guildId,
            fetchedChars[characterId].raidId
          ));
        }
        return characters;
      }),
      tap(characters => {
        this.setCharacters(characters);
      })
    );
  }

  private setCharacters(characters: Character[]) {
    this.characters = characters;
    this.charactersChanged.next(this.getCharacters());
  }

  createCharacter(charInfo: CharacterCreateFormInfo) {
    return this.http.post<{name: string}>(
      this.charactersUrl,
      charInfo
    ).pipe(
      catchError(this.handleError),
      tap(addResp => {
        const characterId = addResp.name;
        const character = new Character(
          charInfo.name,
          charInfo.server,
          charInfo.gear,
          characterId
        );
        this._createCharacter(character);
      })
    );
  }

  private _createCharacter(character: Character) {
    this.characters.push(character);
    this.charactersChanged.next(this.getCharacters());
  }

  deleteCharacter(character: Character) {
    return this.http.delete<null>(
      `${this.characterUrl}${character.id}.json`
    ).pipe(
      catchError(this.handleError),
      tap(deleteResp => this._deleteCharacter(character))
    );
  }

  private _deleteCharacter(victim: Character) {
    this.characters = this.characters.filter(character => character.id !== victim.id);
    this.charactersChanged.next(this.getCharacters());
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