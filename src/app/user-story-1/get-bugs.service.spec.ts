import { TestBed } from '@angular/core/testing';

import { GetBugsService } from './get-bugs.service';

describe('GetBugsService', () => {
  let service: GetBugsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetBugsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
