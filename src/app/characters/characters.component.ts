import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/shared/models/character.model';
import { CharactersService } from '../shared/services/characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  characters: Character[];

  constructor(
    private charactersService: CharactersService
  ) {}

  ngOnInit() {
    this.characters = this.charactersService.characters;
  }

}
