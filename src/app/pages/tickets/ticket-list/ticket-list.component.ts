import { Component, OnInit, OnDestroy,AfterViewInit, AfterViewChecked, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import ITour from 'src/app/models/ITour';
import { ITourTypeSelect } from 'src/app/models/ITourTypeSelect';
import { TicketRestService } from 'src/app/services/rest/ticket-rest.service';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { TiсketsStorageService } from 'src/app/services/tiсkets-storage/tiсkets-storage.service';
import {formatDate} from '@angular/common'

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, OnDestroy{

  tickets: ITour[]=[];
  searchString:string;
  showLoading:boolean;
  updater:Observable<{action:string,value:string | number | undefined}>
  private tourUnsubscriber: Subscription;
  private childUpdater: Subject<{action:string,value:string | number | undefined}>;
  private tourSelectedType:ITourTypeSelect | undefined;

  constructor(
    private ticketsStorage:TiсketsStorageService,
    private ticketRest:TicketRestService,
    private router: Router,
    private ticketService:TicketService
  ) { }

  ngOnInit(): void {
    this.childUpdater = new Subject<{action:string,value:string | number | undefined}>();
    this.updater = this.childUpdater.asObservable();
    this.tickets = this.ticketsStorage.getStorage();
    this.searchString = this.ticketService.doSearchString;
    if (!this.tickets.length){
      this.showLoading = true;
      this.ticketRest.getTickets().subscribe(
        (data)=>{
          this.ticketsStorage.setStorage(data);
          this.tickets = data;
          this.showLoading = false;
        }
      );
      }
    this.tourUnsubscriber = this.ticketService
                                .getTicketTypeObservable()
                                .subscribe(data=>{this.doFiltering(data)});
  }
  ngOnDestroy(): void {
    this.tourUnsubscriber.unsubscribe();
  }
  private doFiltering(data:ITourTypeSelect | undefined):void{
    console.log('data', data);
    const dateValue = data?this.createDate(data.date):"";
    switch (data?.value) {
      case "single":
      case "multi":
        this.tickets = [...this.ticketsStorage.getStorage().filter((el) =>
          el.type === data.value
          && (!dateValue || dateValue === el.date)
          && (!this.ticketService.doSearchString || el.name.toLowerCase().indexOf(this.ticketService.doSearchString.toLowerCase()) > -1)
        )];
        break;
      default:
        this.tickets = [...this.ticketsStorage.getStorage().filter(el=>
          (!dateValue || dateValue === el.date)
          && (!this.ticketService.doSearchString || el.name.toLowerCase().indexOf(this.ticketService.doSearchString.toLowerCase()) > -1)
        )];
        break;
    }
    this.tourSelectedType = data;
    this.childUpdater.next({action:"items", value:"searching by params"});
  }
  private createDate(date:string|undefined|null):string{
    let dateValue:string;
    if (date) {
      return formatDate(date,"YYYY-MM-dd","ru");
    }else{
      return "";
    }
  }
  searchPress(event:KeyboardEvent){
    if (this.searchString?.length>3){
      if (this.ticketService.doSearchString !== this.searchString){
        this.ticketService.doSearchString = this.searchString;
        this.ticketService.updateTour(this.tourSelectedType);
      }
    }else if(this.ticketService.doSearchString){
      this.ticketService.doSearchString = '';
      this.ticketService.updateTour(this.tourSelectedType);
    }
  }
  searchClear(event:MouseEvent){
    this.searchString = '';
    if (this.ticketService.doSearchString){
      this.ticketService.doSearchString = '';
      this.ticketService.updateTour(this.tourSelectedType);
      this.childUpdater.next({action:"items", value:"search is cleared"});
    }
  }
  ticketDblClick(id:string){
    console.log('dblk');
    this.router.navigate(['/tickets/ticket',id]);
  }
  onItemEnter(index:number){
    console.log('ent',index);
    if (index<this.tickets.length){
      this.router.navigate(['/tickets/ticket',this.tickets[index].id]);
    }
  }
  get doSearchString():string{
    return this.ticketService.doSearchString;
  }
  get lastItemIndex():number{
    return this.ticketService.lastItemIndex?this.ticketService.lastItemIndex:0;
  }
  onItemSelect(index:number){
    console.log("tl - itemselect",index);
    this.ticketService.lastItemIndex = index;
  }
}
