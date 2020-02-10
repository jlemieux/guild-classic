import { Injectable } from '@angular/core';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  characters: Character[] = [
    new Character("Moohamed"),
    new Character("Cmurda"),
    new Character("Budang"),
  ]

  constructor() { }
}
