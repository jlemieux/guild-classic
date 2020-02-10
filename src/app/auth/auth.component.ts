import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onModeSwitch() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    
    this.onHandleError(); // clear any errors on submit
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs$: Observable<AuthResponseData>;
    if (this.isLoginMode) {
      authObs$ = this.authService.login(email, password);
    }
    else {
      authObs$ = this.authService.signup(email, password);
    }

    this.isLoading = true;
    authObs$.subscribe(
      authRespData => {
        this.isLoading = false;
        this.router.navigate(['/']);  // go to home on login/signup
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
}
