import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealCreatorComponent } from './meal-creator.component';

xdescribe('MealCreatorComponent', () => {
  let component: MealCreatorComponent;
  let fixture: ComponentFixture<MealCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
