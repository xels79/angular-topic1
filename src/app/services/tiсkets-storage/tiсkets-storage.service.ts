import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import ITour from 'src/app/models/ITour';
import { TicketRestService } from '../rest/ticket-rest.service';

@Injectable({
  providedIn: 'root'
})
export class TiсketsStorageService {

  constructor(private ticketRestService:TicketRestService) { }
  setStorage(data: ITour[]): void {
    // запись данных в this.ticketStorage
  }
  getStorage(): Observable<ITour[]> {
      // возвращает в this.ticketStorage
      return this.ticketRestService.getTickets();
  }
}
