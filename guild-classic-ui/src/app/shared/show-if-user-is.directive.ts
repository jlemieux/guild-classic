import { Directive, TemplateRef, ViewContainerRef, OnDestroy, OnInit, Input } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Directive({
  selector: '[appShowIfUserIs]'
})
export class ShowIfUserIsDirective implements OnInit {

  @Input() appShowIfUserIs: boolean;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.pipe(take(1)).subscribe(user => {
      const isAuth: boolean = user !== null;
      if (isAuth && this.appShowIfUserIs || !isAuth && !this.appShowIfUserIs) {
        console.log("creating a new embedded view container");
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
      else {
        console.log("clearning the view container");
        this.viewContainer.clear();
      }
    });
  }

}
