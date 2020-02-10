import { TestBed, async, inject } from '@angular/core/testing';

import { GuildGuard } from './guild.guard';

describe('GuildGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuildGuard]
    });
  });

  it('should ...', inject([GuildGuard], (guard: GuildGuard) => {
    expect(guard).toBeTruthy();
  }));
});
