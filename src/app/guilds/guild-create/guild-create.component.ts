import { Component, OnInit, OnDestroy } from '@angular/core';
import { Guild } from 'src/app/guild/guild.model';
import { GuildsService } from 'src/app/guilds/guilds.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CharactersService } from 'src/app/characters/characters.service';
import { Subscription } from 'rxjs';
import { Character } from 'src/app/character/character.model';

@Component({
  selector: 'app-guild-create',
  templateUrl: './guild-create.component.html',
  styleUrls: ['./guild-create.component.css']
})
export class GuildCreateComponent implements OnInit, OnDestroy {


  isLoading = false;
  error: string = null;

  characters: Character[] = [];
  private charSub: Subscription;

  constructor(
    private guildsService: GuildsService,
    private charactersService: CharactersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.characters = this.charactersService.getCharacters();
    this.charSub = this.charactersService.charactersChanged.subscribe(characters => {
      this.characters = characters;
    });
  }

  ngOnDestroy() {
    this.charSub.unsubscribe();
  }


  onSubmit(form: NgForm) {
    
    this.onHandleError(); // clear any errors on submit
  
    if (!form.valid) {
      return;
    }
    const name: string = form.value.name;
    const ownerId: string = form.value.owner;

    this.isLoading = true;
    this.guildsService.createGuild(name, ownerId).subscribe(
      addResp => {
        console.log("addResp in create comp: " + addResp);
        this.isLoading = false;
        this.router.navigate(['/guilds']);
      },
      errorMessage => {
        this.isLoading = false;
        this.error = errorMessage;
      }
    )
    form.reset();
  }

  hasGuildlessCharacter() {
    return this.characters.some(character => character.guildId === undefined);
  }

  onHandleError() {
    this.error = null;
  }

}
