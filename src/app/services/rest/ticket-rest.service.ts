import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import ITour, { INearestTour, ITourLocation } from 'src/app/models/ITour';
import { ConfigService } from '../config-service/config-service.service';
import { IOrder } from 'src/app/models/IOrder';

@Injectable({
  providedIn: 'root'
})
export class TicketRestService {

  constructor( private http:HttpClient ) { }

  getTickets():Observable<ITour[]>{
    //return this.http.get<ITour[]>("https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/");
    return this.http.get<ITour[]>(ConfigService.createURL("/tours/"));
  }

  getTicket( id: string ): Observable<ITour> {
    return this.http.get<ITour>(ConfigService.createURL(`/tours/${id}`));
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

  getRandomNearestTours(type: number): Observable<INearestTour> {
    let url = "/assets/mocks/nearestTours2.json";
    switch (type){
      case 0:
        url = "/assets/mocks/nearestTours1.json";
        break
      case 1:
        url = "/assets/mocks/nearestTours2.json";
        break
      case 2:
        url = "/assets/mocks/nearestTours3.json";
        break
    }
    return this.http.get<INearestTour>(url);
  }

  createTour(body: FormData):Observable<any> {
    console.log('sending');
    body.forEach((value, key)=>{
      console.log(key,value);
    });
    return this.http.post<any>( ConfigService.createURL('tour-item'), body );
  }

  sendOrder(data: IOrder): Observable<IOrder> {
    console.log('sending data', data);
    return this.http.post<IOrder>(ConfigService.createURL('order'), data);
  }
}
