import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-orders-header',
  templateUrl: './orders-header.component.html',
  styleUrls: ['./orders-header.component.scss']
})
export class OrdersHeaderComponent implements OnInit, OnDestroy {
  private groupOrderSubscription:Subscription;
  constructor(private orderService: OrdersService) { }
  groupOrderChecked:boolean;
  ngOnInit(): void {
    this.groupOrderSubscription = this.orderService.groupOrders$.subscribe(data=>{
      this.groupOrderChecked = data;
    });
  }
  ngOnDestroy(): void {
    this.groupOrderSubscription.unsubscribe();
  }

  groupOrder( ev: {checked: boolean} ): void {
    this.orderService.initGroupOrders( ev.checked );
  }

}
