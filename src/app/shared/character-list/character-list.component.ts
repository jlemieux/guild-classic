import { Component, OnInit, Input } from '@angular/core';
import { CharacterListParams } from '../models/character-list-params.model';
import { Character } from 'src/app/character/character.model';
import { CharactersService } from 'src/app/characters/characters.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

  @Input() params: CharacterListParams = {};
  characters: Character[] = [];
  isLoading = true;

  constructor(
    private charactersService: CharactersService
  ) { }

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters() {
    this.isLoading = true;
    this.charactersService.getCharacters(this.params).subscribe(data => {
      this.characters = data.characters;
      this.isLoading = false;
    });
    // could handle err => from subscribe to inform user of not loading. else just spinner forever.
  }

}
