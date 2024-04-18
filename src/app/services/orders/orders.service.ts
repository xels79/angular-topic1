import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { BehaviorSubject, Observable, map, of, switchMap, withLatestFrom } from 'rxjs';
import { ORDERMOCKS, OrderPropType, OrderType } from 'src/app/shared/moks/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private groupOrders = new BehaviorSubject(false);
  readonly groupOrders$ = this.groupOrders.asObservable();

  constructor() { }

  getOrders(): Observable<TreeNode<OrderType[]>[]> {
    return of(ORDERMOCKS).pipe(
      withLatestFrom(this.groupOrders$),
      switchMap(([orders, group])=>{
        console.log("Групировка:", group);
        return of(orders).pipe(
          map( data=>[ group ? this.groupData( data, 'name' ) : this.transformOrderData( data ) ])
        );
      })
    );
  }

  transformOrderData(data: OrderType[]): TreeNode<OrderType[]> {
    const treeNodeObj: TreeNode = {
      children:[],
      data:{
        name:"Заказы"
      },
      expanded:true
    };

    if (Array.isArray(data)){
      data.forEach(el=>{
        treeNodeObj.children?.push({ data:el });
      });
    } else {
      return <TreeNode<OrderType[]>>[];
    }
    console.log("threeNodes:",treeNodeObj);
    return treeNodeObj;
  }

  groupData(data: OrderType[], prop: OrderPropType): TreeNode<OrderType[]> {
    const treeNodeObj: TreeNode = {
      children:[],
      data:{
        name:"Заказы"
      },
      expanded:true
    };
    if (Array.isArray(data)){
      const rv = data.reduce( (acc, item) => {
        const index = acc.children.findIndex( chld => chld.data.name === item[prop]);
        if (index>-1){
          acc.children[index].children.push( {data: item} );
        }else{
          acc.children.push({ data: {name:item[prop]}, children: [ {data:item} ]});
        }
        return acc;
      }, treeNodeObj);
      console.log('groupData', rv);
    }else{
      treeNodeObj.data = 'Пусто';
    }
    return treeNodeObj;
  }

  initGroupOrders( val:boolean ): void {
    this.groupOrders.next( val );
  }
}
