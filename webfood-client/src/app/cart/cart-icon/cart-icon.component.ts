import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartComponent } from '../cart.component';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss']
})
export class CartIconComponent implements OnInit {

  constructor(
    private cartService: CartService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  openCart() {
    const dialogRef = this.dialog.open(CartComponent, {
      width: '600px',
      height: '500px',
      data: {},
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The cart component dialog was closed');
    });
  } 

  getBadgeNum(): number {
    return this.cartService.countNumberOfItems();
  }
}
