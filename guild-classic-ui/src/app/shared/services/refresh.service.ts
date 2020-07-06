import { Injectable, OnDestroy } from '@angular/core';
import { HttpBackendClient } from './http-backend.client';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { finalize, exhaustMap } from 'rxjs/operators';
import { ReplaySubject, Observable, timer, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService implements OnDestroy {

  private sub = new Subscription();

  private refreshedSubject = new ReplaySubject<User>(1);
  refreshed$: Observable<User> = this.refreshedSubject;

  constructor(
    private http: HttpBackendClient
  ) { }

  private buildRefreshRequest(): Observable<User> {
    return this.http.post<User>(`${environment.api_url}/me/refresh`, {},
      {
        headers: new HttpHeaders(environment.requestHeaders),
        withCredentials: true
      }
    );
  }

  private startRefreshLoop(): void {
    this.sub.add(timer(environment.refreshInterval, environment.refreshInterval).pipe(
      exhaustMap((t: number) => this.buildRefreshRequest())
    ).subscribe(
      (user: User) => this.refreshedSubject.next(user),
      (err) => this.refreshedSubject.next(null)
    ));
  }

  stopRefreshLoop(): void {
    console.log("inside stopRefreshLoop, unsubbing and making new sub");
    this.sub.unsubscribe();
    this.sub = new Subscription();
  }

  restartRefreshLoop(): void {
    console.log("inside RESTART");
    this.stopRefreshLoop();
    this.startRefreshLoop();
  }

  beforeAppBootstraps(): Promise<undefined> {
    return new Promise((resolve, reject) => {
      this.buildRefreshRequest().pipe(finalize(resolve)).subscribe(
        (user: User) => {
          this.refreshedSubject.next(user);
          this.startRefreshLoop();
        },
        (err) => this.refreshedSubject.next(null)
      );
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
