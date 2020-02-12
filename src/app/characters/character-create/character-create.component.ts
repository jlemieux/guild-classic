import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../characters.service';
import { NgForm } from '@angular/forms';


export interface CharacterCreateFormInfo {
  name: string;
  server: string;
  gear: string;
}

@Component({
  selector: 'app-character-create',
  templateUrl: './character-create.component.html',
  styleUrls: ['./character-create.component.css']
})
export class CharacterCreateComponent implements OnInit {

  isLoading = false;
  error: string = null;
  success: string = null;

  constructor(
    private charactersService: CharactersService
  ) { }

  ngOnInit() {
  }


  onSubmit(form: NgForm) {
    
    this.onHandleError(); // clear any errors on submit
    this.onHandleSuccess();
  
    if (!form.valid) {
      return;
    }
    
    const charInfo: CharacterCreateFormInfo = {...form.value};

    this.isLoading = true;
    this.charactersService.createCharacter(charInfo).subscribe(
      addResp => {
        this.isLoading = false;
        this.success = "Character created!";
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
