import { TestBed } from '@angular/core/testing';

import { GuildsResolverService } from './guilds-resolver.service';

describe('GuildsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuildsResolverService = TestBed.get(GuildsResolverService);
    expect(service).toBeTruthy();
  });
});
