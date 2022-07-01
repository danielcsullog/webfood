import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Restaurant } from '../../../app/core/restaurant';
import { CartService } from '../../../app/cart/service/cart.service';
import { Meal } from '../../../app/core/meal';
import { OrderItem } from '../../../app/core/order.item';
import { MatDialog } from '@angular/material/dialog';
import { CartRestaurantWarnComponent } from 'src/app/cart/cart-restaurant-warn/cart-restaurant-warn.component';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.scss']
})
export class MealDetailsComponent implements OnInit {

  amountForm: FormGroup = this.fb.group({
    amount: ['1', []
    ]
  })

  amount: number = 1;

  @Input() meal!: Meal;
  @Input() mealRestaurant!: Restaurant;
  @Input() needAmount: boolean = true;

  constructor(
    private fb: FormBuilder,
    private cartAlarmDialog: MatDialog,
    private cartService: CartService
  ) { }

  ngOnInit(): void {

  }

  get getAmount(): FormControl {
    return this.amountForm.get('amount') as FormControl;
  }

  lowerAmount() {
    if (this.amount - 1 != 0) {
      --this.amount;
    }
  }

  increaseAmount() {
    if (this.amount + 1 <= 20) {
      ++this.amount;
    }
  }

  addMealToCart() {
    if (this.cartService.isCartRestaurantSimilarToMealRestaurant(this.mealRestaurant)) {
      this.cartService.setRestaurant(this.mealRestaurant);
      const item: OrderItem = {
        meal: this.meal,
        amount: this.amount
      }
      this.cartService.addOrderItemToCart(item);
    } else {
      this.openCartRestaurantWarn();
    }
  }

  openCartRestaurantWarn() {
    const dialogRef = this.cartAlarmDialog.open(
      CartRestaurantWarnComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The cart alarm dialog was closed');
    });
  }
}
