import { Component, OnInit, Input } from '@angular/core';
import { CharacterListParams } from '../models/character-list-params.model';
import { Character } from 'src/app/character/character.model';
import { CharactersService } from 'src/app/shared/services/characters.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

  @Input() params: CharacterListParams = {};
  characters$: Observable<Character[]>;

  constructor(
    private charactersService: CharactersService
  ) { }

  ngOnInit(): void {
    this.characters$ = this.charactersService.getCharacters(this.params);
  }

}
