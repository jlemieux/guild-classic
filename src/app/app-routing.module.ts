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
import { GuildsResolverService } from './guilds/guilds-resolver.service';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'characters', component: CharactersComponent, canActivate: [AuthGuard] },
  { path: 'character/:id', component: CharacterComponent, canActivate: [AuthGuard] },
  { path: 'guilds', component: GuildsComponent, canActivate: [AuthGuard], resolve: [GuildsResolverService] },
  { path: 'guild/:id', component: GuildComponent, canActivate: [AuthGuard], resolve: [GuildsResolverService] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent },
  { path: '404', component: ErrorPageComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: '404' }
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
