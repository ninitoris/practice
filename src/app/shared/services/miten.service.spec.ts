import { TestBed } from '@angular/core/testing';

import { MitenService } from './miten.service';

describe('MitenService', () => {
  let service: MitenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MitenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
