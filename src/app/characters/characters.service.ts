import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Character } from '../character/character.model';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  charactersChanged = new Subject<Character[]>();
  private characters: Character[] = [];

  private charactersUrl = 'https://guild-classic.firebaseio.com/characters.json';
  private deleteCharacterUrl = 'https://guild-classic.firebaseio.com/characters/';

  constructor(
    private http: HttpClient
  ) {}

  getCharacter(charId: string) {
    return this.characters.find(character => character.id === charId);
  }

  getCharacters() {
    return this.characters.slice();
  }

  fetchCharacters() {
    return this.http.get<{[id: string]: Character}>(
      this.charactersUrl
    ).pipe(
      catchError(this.handleError),
      map(fetchedChars => {
        // can be null. dont use map. do for in loop.
        const characters: Character[] = [];
        for (let id in fetchedChars) {
          characters.push(new Character(fetchedChars[id].name, id));
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

  addCharacter(charName: string) {
    return this.http.post<{name: string}>(
      this.charactersUrl,
      {name: charName}
    ).pipe(
      catchError(this.handleError),
      tap(addResp => {
        const character = new Character(charName, addResp.name);
        this._addCharacter(character);
      })
    );
  }

  private _addCharacter(character: Character) {
    this.characters.push(character);
    this.charactersChanged.next(this.getCharacters());
  }

  deleteCharacter(charId: string) {
    return this.http.delete<null>(
      `${this.deleteCharacterUrl}${charId}.json`
    ).pipe(
      catchError(this.handleError),
      tap(deleteResp => {
        this._deleteCharacter(charId);
      })
    );
  }

  private _deleteCharacter(charId: string) {
    this.characters = this.characters.filter(character => character.id !== charId);
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
}