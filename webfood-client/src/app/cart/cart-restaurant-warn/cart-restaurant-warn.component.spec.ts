import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartRestaurantWarnComponent } from './cart-restaurant-warn.component';

describe('CartRestaurantWarnComponent', () => {
  let component: CartRestaurantWarnComponent;
  let fixture: ComponentFixture<CartRestaurantWarnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartRestaurantWarnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartRestaurantWarnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
