import { Component, OnInit, OnDestroy } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { OrderType } from 'src/app/shared/moks/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  tableData$: Observable<TreeNode<OrderType[]>[]>;
  private _TDSubscription: Subscription;

  constructor(private orderService: OrdersService) { }

  ngOnInit(): void {
    this.initOrders();
    this._TDSubscription = this.orderService.groupOrders$.subscribe( data=>{this.initOrders();} );
  }

  ngOnDestroy(): void {
    this._TDSubscription.unsubscribe();
  }

  initOrders():void {
    this.tableData$ = this.orderService.getOrders();
  }
}
