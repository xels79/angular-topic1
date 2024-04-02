import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMenuType } from 'src/app/models/IMenuType ';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  selectedType: IMenuType

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  updateSelectedType(ev: IMenuType): void {
    this.selectedType = ev;
  }

}
