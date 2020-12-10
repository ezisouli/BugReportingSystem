import { TestBed } from '@angular/core/testing';

import { PostBugsService } from './post-bugs.service';

describe('PostBugsService', () => {
  let service: PostBugsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostBugsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
