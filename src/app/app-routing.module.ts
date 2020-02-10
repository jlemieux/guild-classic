import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CharactersComponent } from './characters/characters.component';
import { GuildsComponent } from './guilds/guilds.component';
import { SettingsComponent } from './settings/settings.component';
import { CharacterComponent } from './character/character.component';
import { GuildComponent } from './guild/guild.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { GuildsResolverService } from './shared/services/guilds-resolver.service';
import { GuildGuard } from './guild/guild.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'characters', component: CharactersComponent, canActivate: [AuthGuard] },
  { path: 'characters/:name', component: CharacterComponent, canActivate: [AuthGuard] },
  { path: 'guilds', component: GuildsComponent, canActivate: [AuthGuard], resolve: [GuildsResolverService] },
  { path: 'guilds/:name', component: GuildComponent, canActivate: [GuildGuard], resolve: [GuildsResolverService] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent },
  { path: '**', component: ErrorPageComponent, data: {message: 'Page not found!'} }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
