import { Directive, TemplateRef, ViewContainerRef, OnDestroy, OnInit, Input } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appShowAuthed]'
})
export class ShowAuthedDirective implements OnInit, OnDestroy {

  @Input() appShowAuthed: boolean;
  private authSub: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authSub = this.authService.isAuthenticated$.subscribe(isAuth => {
      if (isAuth && this.appShowAuthed || !isAuth && !this.appShowAuthed) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
      else {
        this.viewContainer.clear();
      }
    });
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

}
