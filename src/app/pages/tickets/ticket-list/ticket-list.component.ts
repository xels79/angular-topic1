import { Component, OnInit, OnDestroy,AfterViewInit, AfterViewChecked, AfterContentInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription, debounceTime, filter, fromEvent, map } from 'rxjs';
import ITour from 'src/app/models/ITour';
import { ITourTypeSelect } from 'src/app/models/ITourTypeSelect';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { TiсketsStorageService } from 'src/app/services/tiсkets-storage/tiсkets-storage.service';
import {formatDate} from '@angular/common'
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, OnDestroy, AfterViewInit{

  tickets: ITour[]=[];
  searchString:string;
  showLoading:boolean;
  updater:Observable<{action:string,value:string | number | undefined}>
  @ViewChild('searchElement') ticketSearch: ElementRef;
  private searchSubscription: Subscription;
  private tourUnsubscriber: Subscription;
  private childUpdater: Subject<{action:string,value:string | number | undefined}>;
  private tourSelectedType:ITourTypeSelect | undefined;
  private ticketUpdateSubscription: Subscription;
  constructor(
    private ticketsStorage:TiсketsStorageService,
    private router: Router,
    private ticketService:TicketService,
    private messageService: MessageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.childUpdater = new Subject<{action:string,value:string | number | undefined}>();
    this.updater = this.childUpdater.asObservable();
    this.tickets = this.ticketsStorage.getStorage();
    this.searchString = this.ticketService.doSearchString;
    this.ticketUpdateSubscription = this.ticketService.$ticketsUpdate.subscribe( data => {
      console.log('getst update',data);
      this.ticketsStorage.setStorage(data);
      this.tickets = data;
      this.showLoading = false;
    });
    if (!this.tickets.length){
      this.showLoading = true;
      this.ticketService.getTickets().subscribe({
        next: (data)=>{
          this.ticketService.updateTickets(data);
        },
        error: err=>{
          if (err.status!==401){
            console.log("Ошибка.");
          }
        }
    });
      }
    this.tourUnsubscriber = this.ticketService
                                .getTicketTypeObservable()
                                .subscribe(data=>{this.doFiltering(data)});
  }
  ngOnDestroy(): void {
    this.tourUnsubscriber.unsubscribe();
    this.searchSubscription.unsubscribe();
  }
  ngAfterViewInit(): void {
    const fromEventObservable = fromEvent<KeyboardEvent>(this.ticketSearch.nativeElement, 'keyup');
    let needReset=false;
    this.searchSubscription = fromEventObservable.pipe(
      debounceTime( 300 ),
      map(ev=>(ev.target as HTMLInputElement).value.toLowerCase()),
      filter(val=>(!!val && val.length>2) || needReset)
    ).subscribe(val=>{
      if ((!val || val.length<3) && needReset){
        needReset = false;
        this.ticketService.doSearchString = '';
      }else{
        needReset = true;
        this.ticketService.doSearchString = val;
      }
      this.ticketService.updateTour(this.tourSelectedType);
    })
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
  searchClear(event:MouseEvent){
    this.searchString = '';
    if (this.ticketService.doSearchString){
      this.ticketService.doSearchString = '';
      this.ticketService.updateTour(this.tourSelectedType);
      this.childUpdater.next({action:"items", value:"search is cleared"});
    }
  }
  ticketDblClick(id:string){
    console.log('dblk', id);
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

  createUrl( url: string): string {
    return this.ticketService.createUrl( url );
  }
}
