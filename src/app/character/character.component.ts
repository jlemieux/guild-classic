import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Character } from './character.model';
import { CharactersService } from '../characters/characters.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  character: Character;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private charactersService: CharactersService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.character = this.charactersService.getCharacter(params['id']);
        if (this.character === undefined) {
          this.router.navigateByUrl('/404', { skipLocationChange: true });
        }
      }
    );
  }
}
