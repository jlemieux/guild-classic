import { TestBed } from '@angular/core/testing';

import { GuildResolverService } from './guild-resolver.service';

describe('GuildResolverService', () => {
  let service: GuildResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuildResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
