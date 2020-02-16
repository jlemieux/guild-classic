import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from '../shared/services/auth.service';
import { Credentials } from '../shared/models/credentials.model';
import { ErrorList } from '../shared/models/error-list.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authType: string;
  title: string;
  errors: ErrorList = {};
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.authForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.url.subscribe(urlSegments => {
      this.authType = urlSegments[urlSegments.length - 1].path;
      this.title = (this.authType === 'login') ? 'Sign in': 'Sign up';
      if (this.authType === 'login') {
        this.title = 'Sign in';
      }
      else {
        this.title = 'Sign up';
        this.authForm.addControl('email', new FormControl());
      }
    });
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {};  // clear errors on submit
    const credentials: Credentials = this.authForm.value;
    this.authService.attemptAuth(this.authType, credentials)
      .subscribe(
        data => this.router.navigateByUrl('/'),
        err => {
          this.errors = err;
          this.isSubmitting = false;
        }
      )
  }

  /*
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
  */
}
