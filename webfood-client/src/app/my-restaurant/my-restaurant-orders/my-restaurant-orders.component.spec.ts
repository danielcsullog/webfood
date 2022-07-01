import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRestaurantOrdersComponent } from './my-restaurant-orders.component';

xdescribe('MyRestaurantOrdersComponent', () => {
  let component: MyRestaurantOrdersComponent;
  let fixture: ComponentFixture<MyRestaurantOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyRestaurantOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRestaurantOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
