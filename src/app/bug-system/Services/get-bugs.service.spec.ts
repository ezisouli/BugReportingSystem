import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {  HttpClientTestingModule } from '@angular/common/http/testing';
import { GetBugsService } from './get-bugs.service';

describe('GetBugsService', () => {
  let service: GetBugsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(GetBugsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
