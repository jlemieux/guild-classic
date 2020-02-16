import { TestBed } from '@angular/core/testing';

import { GuildsService } from '../shared/services/guilds.service';
import { Guild } from '../guild/guild.model';

describe('GuildsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuildsService = TestBed.get(GuildsService);
    expect(service).toBeTruthy();
  });
});

