import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, ParamMap } from '@angular/router';
import { Character } from './character.model';
import { CharactersService } from '../shared/services/characters.service';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  character$: Observable<Character>;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.character$ = this.route.data.pipe(map(data => data.character));
  }

  /*
  //character: Character;
  character$: Observable<Character>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private charactersService: CharactersService
  ) { }

  // ngOnInit() {
  //   this.route.params.subscribe(
  //     (params: Params) => {
  //       this.character = this.charactersService.getCharacter(params['id']);
  //       if (this.character === undefined) {
  //         this.router.navigateByUrl('/404', { skipLocationChange: true });
  //       }
  //     }
  //   );
  // }

  ngOnInit() {
    this.character$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.charactersService.getCharacter(params.get('id'));
      })
    );
  }

  gotoCharacters() {
    this.router.navigate(['/characters']);
  }
  */
}
