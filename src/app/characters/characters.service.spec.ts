import { TestBed } from '@angular/core/testing';

import { CharactersService } from '../shared/services/characters.service';

describe('CharactersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CharactersService = TestBed.get(CharactersService);
    expect(service).toBeTruthy();
  });
});
