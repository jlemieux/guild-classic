import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GuildsService } from '../shared/services/guilds.service';

@Injectable({
  providedIn: 'root'
})
export class GuildGuard implements CanActivate {

  constructor(
    private guildsService: GuildsService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //if (next.params['name'] && next.params['name'])
    return true;
  }
  
}
