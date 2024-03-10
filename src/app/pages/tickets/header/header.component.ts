import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];

  constructor() { }

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
  }

}
