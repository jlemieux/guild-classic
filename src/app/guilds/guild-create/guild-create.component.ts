import { Component, OnInit } from '@angular/core';
import { Guild } from 'src/app/guild/guild.model';
import { GuildsService } from 'src/app/guilds/guilds.service';
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

    this.isLoading = true;
    this.guildsService.addGuild(name).subscribe(
      addResp => {
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
