import { TestBed } from '@angular/core/testing';
import { LocalApiService } from './localapi.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LocalapiService', () => {
  let service: LocalApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LocalApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
