import { Injectable } from '@angular/core';
import { CharactersService } from '../shared/services/characters.service';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Character } from './character.model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CharacterResolverService implements Resolve<Character> {

  constructor(
    private charactersService: CharactersService,
    private router: Router
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    
    return this.charactersService.getCharacter(route.paramMap.get('slug'))
      .pipe(catchError(err => this.router.navigateByUrl('/404')));

  }

}
