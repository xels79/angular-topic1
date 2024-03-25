import { Component, OnInit } from '@angular/core';
import ITour from 'src/app/models/ITour';
import { TicketRestService } from 'src/app/services/rest/ticket-rest.service';
import { TiсketsStorageService } from 'src/app/services/tiсkets-storage/tiсkets-storage.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit{

  tickets: ITour[]=[];
  searchString:string;
  doSearchString:string;
  showLoading:boolean;
  constructor(
    private ticketsStorage:TiсketsStorageService,
    private ticketRest:TicketRestService
  ) { }

  ngOnInit(): void {
    this.showLoading = true;
    this.ticketRest.getTickets().subscribe(
      (data)=>{
        this.ticketsStorage.setStorage(data);
        this.tickets = data;
        this.showLoading = false;
      }
    );
  }
  searchPress(event:KeyboardEvent){
    if (this.searchString?.length>3){
      if (this.doSearchString !== this.searchString){
        this.doSearchString = this.searchString;
        this.tickets = this.ticketsStorage.getStorage().filter(ticket=>ticket.name.toLowerCase().indexOf(this.doSearchString.toLowerCase()) > -1);
      }
    }else{
      this.doSearchString = '';
      this.tickets = [...this.ticketsStorage.getStorage()];
    }
  }
  searchClear(event:MouseEvent){
    this.searchString = '';
    if (this.doSearchString){
      this.doSearchString = '';
      this.tickets = [...this.ticketsStorage.getStorage()];
    }
  }
}
