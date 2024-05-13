import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, ActivationStart, Router } from '@angular/router';
import { Subject, filter, map, takeUntil } from 'rxjs';
import { IMenuType } from 'src/app/models/IMenuType ';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit, OnDestroy {
  selectedMenuType: IMenuType;
  showAsaid = true;
  private destr = new Subject<void>();
  orderButtonsIsOperated = true;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    //Asaid panel

    this.showAsaid = !this.reqursiveFindAsaidData(this.route.snapshot,'hideAsaid');
    this.orderButtonsIsOperated = !this.reqursiveFindAsaidData(this.route.snapshot,'blockOrderButton');
    this.router.events.pipe(
      filter(ev=>ev instanceof ActivationStart),
      map(ev=>(ev as ActivationStart).snapshot.data),
      takeUntil(this.destr),
    ).subscribe(data=>{
      this.showAsaid = !data['hideAsaid'];
      this.orderButtonsIsOperated = !data['blockOrderButton'];
    })

  }
  ngOnDestroy(): void {
    this.destr.next();
    this.destr.complete();
  }
  private reqursiveFindAsaidData(curentSnapshot:ActivatedRouteSnapshot, searchProp:string): boolean {
    if (curentSnapshot.data[searchProp]){
      return true;
    }else{
      if (Array.isArray(curentSnapshot.children)){
        let result = false;
        curentSnapshot.children.every(item=>{
          result = this.reqursiveFindAsaidData(item, searchProp);
          return !result;
        });
        return result;
      }else{
        return false;
      }
    }
  }

}
