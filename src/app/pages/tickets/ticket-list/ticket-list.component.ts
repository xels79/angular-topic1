import { Component, OnInit, OnDestroy } from '@angular/core';
import ITour from 'src/app/models/ITour';
import { TiсketsStorageService } from 'src/app/services/tiсkets-storage/tiсkets-storage.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {

  tickets: ITour[]=[];
  searchString:string;
  doSearchString:string;
  delayId:number;
  showLoading:boolean;
  constructor( private ticketsStorage:TiсketsStorageService) { }

  ngOnInit(): void {
    this.showLoading = true;
    this.ticketsStorage.getStorage().subscribe(
      (data)=>{
        this.tickets = data;
        this.showLoading = false;
      }
    );
  }
  ngOnDestroy():void{
    if (this.delayId){
      clearTimeout(this.delayId);
    }
  }
  private startSearchTimer(){
    if (this.delayId){
      clearTimeout(this.delayId);
    }
    this.delayId = window.setTimeout(()=>{
      // console.log(`do search :'${this.searchString}'`);
      this.delayId = 0;
      this.showLoading = true;
      this.ticketsStorage.getStorage().subscribe(
        (data)=>{
          this.showLoading = false;
          if (this.doSearchString){
            this.tickets = data.filter(ticket=>ticket.name.toLowerCase().indexOf(this.doSearchString.toLowerCase()) > -1);
          }else{
            this.tickets = data;
          }
        }
      );
    },1000);
  }
  searchPress(event:KeyboardEvent){
    if (this.searchString?.length>3){
      if (this.doSearchString !== this.searchString){
        this.doSearchString = this.searchString;
        this.startSearchTimer();
      }
    }else if (this.doSearchString){
      this.doSearchString = '';
      this.startSearchTimer();
    }
  }
  searchClear(event:MouseEvent){
    this.searchString = '';
    if (this.doSearchString){
      this.doSearchString = '';
      this.startSearchTimer();
    }
  }
}
