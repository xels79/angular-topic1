import { Component, OnInit } from '@angular/core';
import ITour from 'src/app/models/ITour';
import { TiсketsStorageService } from 'src/app/services/tiсkets-storage/tiсkets-storage.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit{

  tickets: ITour[]=[];
  tickets_back: ITour[]=[];
  searchString:string;
  doSearchString:string;
  showLoading:boolean;
  constructor(
    private ticketsStorage:TiсketsStorageService,
  ) { }

  ngOnInit(): void {
    this.showLoading = true;
    this.ticketsStorage.getStorage().subscribe(
      (data)=>{
        this.tickets = data;
        this.tickets_back = [...this.tickets];
        this.showLoading = false;
      }
    );
  }
  searchPress(event:KeyboardEvent){
    if (this.searchString?.length>3){
      if (this.doSearchString !== this.searchString){
        this.doSearchString = this.searchString;
        this.tickets = this.tickets_back.filter(ticket=>ticket.name.toLowerCase().indexOf(this.doSearchString.toLowerCase()) > -1);
      }
    }else{
      this.doSearchString = '';
      this.tickets = [...this.tickets_back];
    }
  }
  searchClear(event:MouseEvent){
    this.searchString = '';
    if (this.doSearchString){
      this.doSearchString = '';
      this.tickets = [...this.tickets_back];
    }
  }
}
