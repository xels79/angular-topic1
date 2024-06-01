import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ITourTypeSelect } from 'src/app/models/ITourTypeSelect';
import { TicketRestService } from '../rest/ticket-rest.service';
import ITour, { INearestTour, ITourLocation } from 'src/app/models/ITour';
import { IOrder } from 'src/app/models/IOrder';
import { ConfigService } from '../config-service/config-service.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService implements OnInit{
  private ticketSubject = new  BehaviorSubject<ITourTypeSelect | undefined>(undefined)
  private ticketsUpdate = new BehaviorSubject<ITour[]>([]);
  readonly $ticketsUpdate = this.ticketsUpdate.asObservable();
  readonly $ticketSubject = this.ticketSubject.asObservable();
  doSearchString:string;
  lastItemIndex:number;
  constructor(private ticketRest:TicketRestService) { }

  ngOnInit(): void {
    this.doSearchString = "";
    this.lastItemIndex=0;
  }
  getTicketTypeObservable(): Observable<ITourTypeSelect | undefined> {
    return this.ticketSubject.asObservable();
  }

  updateTour(type:ITourTypeSelect | undefined): void {
    this.ticketSubject.next(type);
  }

  sendOrder(data: IOrder): Observable<IOrder>{
    return this.ticketRest.sendOrder( data );
  }

  updateTickets(data: ITour[]){
    this.ticketsUpdate.next(data);
  }

  getTickets(): Observable<ITour[]>{
    return this.ticketRest.getTickets();
  }

  getTicketsByName( name:string ): Observable<ITour[]> {
    return this.ticketRest.getTicketsByName( name );
  }

  getTicket(id: string): Observable<ITour> {
    return this.ticketRest.getTicket( id );
  }

  getError(): Observable<any>{
    return this.ticketRest.getRestError();
  }

  getNearestTours(): Observable<INearestTour[]> {
    return this.ticketRest.getNearestTickets();
  }

  getToursLocation(): Observable<ITourLocation[]> {
    return this.ticketRest.getLocationList();
  }

  getRandomNearestTours(type: number): Observable<INearestTour> {
    return this.ticketRest.getRandomNearestTours(type);
  }

  createTour(body: FormData): Observable<any> {
    return this.ticketRest.createTour( body );
  }
  createUrl( url: string): string {
    if (url.startsWith('/public')) {
        return url.replace(
          '/public',
          ConfigService.createURL('/public')
        );
    }else{
      return url;
    }
  }
}
