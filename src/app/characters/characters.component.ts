import { Component, OnInit, OnDestroy } from '@angular/core';
import { Character } from 'src/app/character/character.model';
import { CharactersService } from './characters.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit, OnDestroy {

  characters: Character[];
  private sub: Subscription;

  constructor(
    private charactersService: CharactersService
  ) {}

  ngOnInit() {
    this.characters = this.charactersService.getCharacters();
    this.sub = this.charactersService.charactersChanged.subscribe(characters => {
      this.characters = characters;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onDeleteCharacter(character: Character) {
    this.charactersService.deleteCharacter(character).subscribe(
      deleteResp => {
        console.log("Character deleted!");
      },
      errorMessage => {
        console.log(errorMessage);
      }
    );
  }

}
