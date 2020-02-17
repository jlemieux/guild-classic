import { Injectable } from '@angular/core';
import { GuildsService } from '../shared/services/guilds.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Guild } from './guild.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuildResolverService implements Resolve<Guild> {

  constructor(
    private guildsService: GuildsService,
    private router: Router
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    
    return this.guildsService.getGuild(route.paramMap.get('slug'))
      .pipe(catchError(err => this.router.navigateByUrl('/404')));

  }
}
