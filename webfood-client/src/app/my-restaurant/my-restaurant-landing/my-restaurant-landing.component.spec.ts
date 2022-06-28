import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRestaurantLandingComponent } from './my-restaurant-landing.component';

describe('MyRestaurantLandingComponent', () => {
  let component: MyRestaurantLandingComponent;
  let fixture: ComponentFixture<MyRestaurantLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyRestaurantLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRestaurantLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
