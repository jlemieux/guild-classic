import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildPreviewComponent } from './guild-preview.component';

describe('GuildPreviewComponent', () => {
  let component: GuildPreviewComponent;
  let fixture: ComponentFixture<GuildPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuildPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuildPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
