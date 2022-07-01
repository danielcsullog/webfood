import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRestaurantWorkersComponent } from './my-restaurant-workers.component';

xdescribe('MyRestaurantWorkersComponent', () => {
  let component: MyRestaurantWorkersComponent;
  let fixture: ComponentFixture<MyRestaurantWorkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyRestaurantWorkersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRestaurantWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
