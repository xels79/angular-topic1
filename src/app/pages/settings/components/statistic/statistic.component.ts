import { Component, OnInit } from '@angular/core';
import { ICustomStatisticUser } from 'src/app/models/IUser';
import { StatisticService } from 'src/app/services/statistic/statistic.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

  tableRow: ICustomStatisticUser[] = [];
  cols:{field: keyof ICustomStatisticUser, headerText: string}[] = [
    { field: 'name', headerText: 'Имя' },
    { field: 'company', headerText: 'Компания' },
    { field: 'phone', headerText: 'Телефон' },
    { field: 'city', headerText: 'Город' },
    { field: 'street', headerText: 'Улица' }
  ]
  showLoading = true;

  constructor(private statisticService: StatisticService) { }

  ngOnInit(): void {
    this.statisticService.getStatistic().subscribe( data=>{
      console.log( data );
      this.tableRow = data;
      this.showLoading = false;
    });
  }

}
