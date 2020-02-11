import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Character } from '../character/character.model';
import { CharactersService } from './characters.service';

@Injectable({
  providedIn: 'root'
})
export class CharactersResolverService implements Resolve<Character[]> {

  constructor(
    private charactersService: CharactersService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const characters = this.charactersService.getCharacters();
    return characters.length > 0 ? characters : this.charactersService.fetchCharacters();
  }
}
