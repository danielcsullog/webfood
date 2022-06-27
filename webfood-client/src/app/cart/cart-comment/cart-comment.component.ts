import { Component, OnInit } from '@angular/core';
import { OrderItem } from 'src/app/core/order.item';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart-comment',
  templateUrl: './cart-comment.component.html',
  styleUrls: ['./cart-comment.component.scss']
})
export class CartCommentComponent implements OnInit {

  comment!: string;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.comment = "";
  }

  sendOrder() {
    this.cartService.comment = this.comment;
    this.cartService.sendOrder();
  }
}
