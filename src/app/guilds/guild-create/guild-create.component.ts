import { Component, OnInit } from '@angular/core';
import { Guild } from 'src/app/shared/models/guild.model';
import { GuildsService } from 'src/app/shared/services/guilds.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-guild-create',
  templateUrl: './guild-create.component.html',
  styleUrls: ['./guild-create.component.css']
})
export class GuildCreateComponent implements OnInit {


  isLoading = false;
  error: string = null;
  success: string = null;

  constructor(
    private router: Router,
    private guildsService: GuildsService
  ) { }

  ngOnInit() {
  }


  onSubmit(form: NgForm) {
    
    this.onHandleError(); // clear any errors on submit
    this.onHandleSuccess();
  
    if (!form.valid) {
      return;
    }
    const name = form.value.name;

    //const guild = new Guild(name);
    //this.guildsService.addGuild(guild);

    this.isLoading = true;
    this.guildsService.storeGuild(name).subscribe(
      guildStoredResp => {
        const guild = new Guild(name, guildStoredResp.name);
        this.guildsService.addGuild(guild);
        this.isLoading = false;
        this.success = "Guild created!";
        setTimeout(() => {
          this.onHandleSuccess();
        }, 2000);
      },
      errorMessage => {
        this.isLoading = false;
        this.error = errorMessage;
      }
    )
    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  onHandleSuccess() {
    this.success = null;
  }

}
