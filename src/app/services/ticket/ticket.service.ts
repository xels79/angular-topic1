import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ITourTypeSelect } from 'src/app/models/ITourTypeSelect';
import { TicketRestService } from '../rest/ticket-rest.service';
import ITour, { INearestTour, ITourLocation } from 'src/app/models/ITour';

@Injectable({
  providedIn: 'root'
})
export class TicketService implements OnInit{
  private ticketSubject = new  BehaviorSubject<ITourTypeSelect | undefined>(undefined)
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
  getTickets(): Observable<ITour[]>{
    return this.ticketRest.getTickets();
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
}
