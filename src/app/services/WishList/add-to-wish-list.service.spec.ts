import { TestBed } from '@angular/core/testing';

import { AddToWishListService } from './add-to-wish-list.service';

describe('AddToWishListService', () => {
  let service: AddToWishListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddToWishListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
