import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { ApiService } from '../shared/services/api.service';
import { User } from '../shared/models/user.model';
import { AbstractUserComponent } from '../shared/abstract-user/abstract-user.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends AbstractUserComponent {


  constructor(
    authService: AuthService,
    private apiService: ApiService
  ) {
    super(authService);
  }

  ngOnInit() {
    super.ngOnInit();
    console.log("in child home component ngoninit");
    //this.authService.currentUser$.subscribe((user: User) => this.user = user);
  }

  testCreateUser() {
    this.authService.createUser('client@email.com', 'mytestpass').subscribe(
      (user: User) => console.log("User created!"),
      (err) => console.log("Could not create user...")
    );
  }

  testLogIn() {
    this.authService.logIn('client@email.com', 'mytestpass').subscribe(
      (user: User) => console.log("Logged in!"),
      (err) => console.log("Could not log in!")
    );
  }

  testGetUser() {
    this.authService.getUser().subscribe(
      (user: User) => console.log("Got the user!"),
      (err) => console.log("Could not get the user!")
    );
  }

  // testRefresh() {
  //   this.apiService.post('/me/refresh').subscribe(resp => {
  //     console.log(resp);
  //     this.user = resp;
  //   });
  // }

  testLogout() {
    this.authService.logout().subscribe(
      (resp: {message: string}) => console.log(resp.message),
      (err) => console.log(err)
    );
  }

  testLogoutAll() {
    this.authService.logoutAll().subscribe(
      (resp: {message: string}) => console.log(resp.message),
      (err) => console.log(err)
    );
  }

  // currentUser: User;
  // guildListParams: GuildListParams = {} as GuildListParams;
  // characterListParams: CharacterListParams = {} as CharacterListParams;
  // isPersonal: boolean;

  // currentUser: User;
  // guildListParams: GuildListParams;
  // characterListParams: CharacterListParams;

  // constructor(
  //   private route: ActivatedRoute
  // ) { }

  // ngOnInit() {
  //   this.route.data.subscribe((data: {user: User}) => {
  //     this.currentUser = data.user;
  //   });
  // }

  // personal() {
  //   this.guildListParams.hasUser = this.currentUser.email;
  //   this.characterListParams.owner = this.currentUser.email;
  // }

  // all() {
  //   this.guildListParams = {} as GuildListParams;
  //   this.characterListParams = {} as CharacterListParams;
  // }

}
