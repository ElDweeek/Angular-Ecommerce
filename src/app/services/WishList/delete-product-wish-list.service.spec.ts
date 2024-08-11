import { TestBed } from '@angular/core/testing';

import { DeleteProductWishListService } from './delete-product-wish-list.service';

describe('DeleteProductWishListService', () => {
  let service: DeleteProductWishListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteProductWishListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
