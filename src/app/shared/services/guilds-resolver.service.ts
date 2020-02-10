import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GuildsService } from './guilds.service';
import { Guild } from '../models/guild.model';

@Injectable({
  providedIn: 'root'
})
export class GuildsResolverService implements Resolve<Guild[]> {

  constructor(
    private guildsService: GuildsService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const guilds = this.guildsService.getGuilds();
    return guilds.length > 0 ? guilds : this.guildsService.fetchGuilds();
  }
}
