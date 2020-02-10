import { TestBed, async, inject } from '@angular/core/testing';

import { CharacterGuard } from './character.guard';

describe('CharacterGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CharacterGuard]
    });
  });

  it('should ...', inject([CharacterGuard], (guard: CharacterGuard) => {
    expect(guard).toBeTruthy();
  }));
});
