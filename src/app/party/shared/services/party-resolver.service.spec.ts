import { TestBed } from '@angular/core/testing';

import { PartyResolverService } from './party-resolver.service';

describe('PartyResolverService', () => {
  let service: PartyResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartyResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
