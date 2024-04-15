import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import ITour, { INearestTour, ITourLocation } from 'src/app/models/ITour';

@Injectable({
  providedIn: 'root'
})
export class TicketRestService {

  constructor( private http:HttpClient ) { }

  getTickets():Observable<ITour[]>{
    return this.http.get<ITour[]>("https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/");
  }

  getRestError(): Observable<any> {
    return this.http.get<any>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/notFound');
  }

  getNearestTickets(): Observable<INearestTour[]> {
    return this.http.get<INearestTour[]>("https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/nearestTours/");
  }

  getLocationList(): Observable<ITourLocation[]> {
    return this.http.get<ITourLocation[]>("https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/location/");
  }

}
