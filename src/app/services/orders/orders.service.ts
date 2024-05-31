import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { BehaviorSubject, Observable, map, of, switchMap, withLatestFrom } from 'rxjs';
import { IOrder } from 'src/app/models/IOrder';
import ITour from 'src/app/models/ITour';
import { ORDERMOCKS } from 'src/app/shared/moks/order';
import { ConfigService } from '../config-service/config-service.service';
import { UserService } from '../user/user.service';
export type OrderType = IOrder & ITour;
type OrderPropType = keyof OrderType;
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private groupOrders = new BehaviorSubject(false);
  readonly groupOrders$ = this.groupOrders.asObservable();

  constructor(
    private http: HttpClient,
    private userSrvice: UserService
  ) { }

  getOrders(): Observable<TreeNode<OrderType[]>[]> {
    const username=this.userSrvice.getUser()?.username;
    if (username){
      return this.http.get<OrderType[]>(ConfigService.createURL(`order/${username}`)).pipe(
        withLatestFrom(this.groupOrders$),
        switchMap(([orders, group])=>{
          console.log("Групировка:", group);
          return of(orders).pipe(
            map( data=>[ group ? this.groupData( data, 'name' ) : this.transformOrderData( data ) ])
          );
        })
      );
    }else{
      return of(<TreeNode<OrderType[]>[]><unknown>[{ data: 'Пусто' }]);
    }
  }

  transformOrderData(data: OrderType[]): TreeNode<OrderType[]> {
    if (Array.isArray(data)){
      return data.reduce((acc, item)=>{
        acc.children?.push({data:item});
        return acc;
      }, {children:[], data:{name:"Заказы"},expanded:true} as TreeNode);
    } else {
      return <TreeNode<OrderType[]>>[{data:'Пусто'}];
    }
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
        const name = item.name;
        if (index>-1){
          acc.children[index].children.push( {data: item} );
        }else{
          acc.children.push({ data: {name:name}, children: [ {data:item} ]});
        }
        return acc;
      }, treeNodeObj);
      console.log('groupData', rv);
      return rv as TreeNode<OrderType[]>;
    }else{
      treeNodeObj.data = 'Пусто';
    }
    return treeNodeObj;
  }

  initGroupOrders( val:boolean ): void {
    this.groupOrders.next( val );
  }
}
