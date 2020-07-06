import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';
//import { CharactersComponent } from './characters/characters.component';
//import { GuildsComponent } from './guilds/guilds.component';
import { SettingsComponent } from './settings/settings.component';
import { CharacterComponent } from './character/character.component';
import { GuildComponent } from './guild/guild.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { AuthInterceptorService } from './shared/services/auth-interceptor.service';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { KebabCasePipe } from './shared/pipes/kebab-case.pipe';
//import { GuildCreateComponent } from './guilds/guild-create/guild-create.component';
//import { CharacterCreateComponent } from './characters/character-create/character-create.component';
import { ListErrorsComponent } from './shared/list-errors/list-errors.component';
import { GuildListComponent } from './shared/guild-list/guild-list.component';
import { GuildPreviewComponent } from './shared/guild-preview/guild-preview.component';
import { CharacterPreviewComponent } from './shared/character-preview/character-preview.component';
import { CharacterListComponent } from './shared/character-list/character-list.component';
import { ShowIfUserIsDirective } from './shared/show-if-user-is.directive';
import { AuthService } from './shared/services/auth.service';
import { HttpBackendClient } from './shared/services/http-backend.client';
import { RefreshService } from './shared/services/refresh.service';
import { AbstractUserComponent } from './shared/abstract-user/abstract-user.component';
//import { StartupService } from './shared/services/startup.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorPageComponent,
    //CharactersComponent,
    //GuildsComponent,
    SettingsComponent,
    CharacterComponent,
    GuildComponent,
    AuthComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
    KebabCasePipe,
    //GuildCreateComponent,
    //CharacterCreateComponent,
    ListErrorsComponent,
    GuildListComponent,
    GuildPreviewComponent,
    CharacterPreviewComponent,
    CharacterListComponent,
    ShowIfUserIsDirective,
    AbstractUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    RefreshService,
    {
      provide: APP_INITIALIZER,
      deps: [RefreshService],
      useFactory: (refreshService: RefreshService) =>
        () => refreshService.beforeAppBootstraps(),
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
