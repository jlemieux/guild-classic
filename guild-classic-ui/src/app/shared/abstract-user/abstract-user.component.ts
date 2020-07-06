import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';

@Component({ template: '' })
export class AbstractUserComponent implements OnInit, OnDestroy {

  private sub = new Subscription();
  user: User;

  constructor(protected authService: AuthService) { }

  ngOnInit(): void {
    console.log("in parent abstract user component ngoninit");
    this.sub.add(this.authService.currentUser$.subscribe((user: User) =>
      this.user = user
    ));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
