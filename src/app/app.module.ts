import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CharactersComponent } from './characters/characters.component';
import { GuildsComponent } from './guilds/guilds.component';
import { SettingsComponent } from './settings/settings.component';
import { CharacterComponent } from './character/character.component';
import { GuildComponent } from './guild/guild.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { KebabCasePipe } from './shared/pipes/kebab-case.pipe';
import { GuildCreateComponent } from './guilds/guild-create/guild-create.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorPageComponent,
    CharactersComponent,
    GuildsComponent,
    SettingsComponent,
    CharacterComponent,
    GuildComponent,
    AuthComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
    KebabCasePipe,
    GuildCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
