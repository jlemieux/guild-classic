import { TestBed } from '@angular/core/testing';

import { CharactersResolverService } from './characters-resolver.service';

describe('CharactersResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CharactersResolverService = TestBed.get(CharactersResolverService);
    expect(service).toBeTruthy();
  });
});
