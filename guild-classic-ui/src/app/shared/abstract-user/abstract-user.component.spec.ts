import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractUserComponent } from './abstract-user.component';

describe('AbstractUserComponent', () => {
  let component: AbstractUserComponent;
  let fixture: ComponentFixture<AbstractUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbstractUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
