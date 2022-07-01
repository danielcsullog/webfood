import { TestBed } from '@angular/core/testing';

import { MyRestaurantService } from './my-restaurant.service';

xdescribe('MyRestaurantService', () => {
  let service: MyRestaurantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyRestaurantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
