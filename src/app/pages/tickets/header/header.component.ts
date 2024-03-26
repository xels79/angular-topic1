import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnDestroy, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UserService } from 'src/app/services/user/user.service';
import { IMenuType } from 'src/app/models/IMenuType ';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  items: MenuItem[];
  currentDate:Date;
  settingsActive:boolean;
  @Input() menuType:IMenuType;
  private dateTimerID:number;
  constructor(
    public user:UserService,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.settingsActive = false;
    this.items = this.createMenuItems();
    this.dateTimerID = window.setInterval(()=>{
      this.currentDate = new Date();
    }, 1000);
  }
  ngOnDestroy():void{
    if (this.dateTimerID){
      window.clearInterval(this.dateTimerID);
    }
  }
  ngOnChanges(ev: SimpleChanges):void{
    this.settingsActive = this.menuType?.type==='extended';
    this.items = this.createMenuItems();
  }

  private createMenuItems():MenuItem[]{
    return [
      {
          label: 'Билеты',
          icon: 'pi pi-fw pi-file',
          routerLink:['/tickets/list'],
          routerLinkActiveOptions:["p-highlight"]
      },
      {
        label:"Настройки",
        icon: 'pi pi-fw pi-cog',
        routerLink:['/tickets/settings'],
        visible: this.settingsActive
      },
      {
          label: 'Выйти',
          icon: 'pi pi-fw pi-sign-out',
          command:()=>{this.authService.logout()},
          routerLink:['/auth']
      }
    ];
  }
}
