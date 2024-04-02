import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IMenuType } from 'src/app/models/IMenuType ';
import ITour from 'src/app/models/ITour';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  selectedMenuType: IMenuType

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  updateSelectedType(ev: IMenuType): void {
    this.selectedMenuType = ev;
  }

}
