import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  items: MenuItem[];
  currentDate:Date;
  private dateTimerID:number;
  constructor(
    public user:UserService
  ) { }

  ngOnInit(): void {
    this.items = [
      {
          label: 'Билеты',
          icon: 'pi pi-fw pi-file',
          routerLink:['/tickets']
      },
      {
          label: 'Выйти',
          icon: 'pi pi-fw pi-power-off',
          routerLink:['auth']
      }
    ];
    this.dateTimerID = window.setInterval(()=>{
      this.currentDate = new Date();
    }, 1000);
  }
  ngOnDestroy():void{
    if (this.dateTimerID){
      window.clearInterval(this.dateTimerID);
    }
  }
}
