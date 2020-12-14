import { TestBed } from '@angular/core/testing';

import { DeleteBugsService } from './delete-bugs.service';

describe('DeleteBugsService', () => {
  let service: DeleteBugsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteBugsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
