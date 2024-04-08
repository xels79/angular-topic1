import { Component, OnInit } from '@angular/core';
import { ConfigService } from './services/config-service/config-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ticketSales2022';
  constructor(private configService: ConfigService){}

  ngOnInit(): void {
    // this.configService.configLoad();
  }
}
