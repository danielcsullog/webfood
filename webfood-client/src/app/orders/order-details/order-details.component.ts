import { Component, Input, OnInit } from '@angular/core';
import { UserAddress } from 'src/app/core/user.address';
import { Order } from '../../core/order';
import { OrderItem } from '../../core/order.item';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  @Input() order!: Order;

  constructor(
    private orderService: OrderService
  ) {
    
   }

  async ngOnInit(): Promise<void> {
  
  }

}
