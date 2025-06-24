import {TestBed} from '@angular/core/testing';

import {MentorRequestService} from './mentor-request.service';

describe('MentorRequestService', () => {
  let service: MentorRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MentorRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
