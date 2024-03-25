import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import ITour from 'src/app/models/ITour';
import { TicketRestService } from '../rest/ticket-rest.service';

@Injectable({
  providedIn: 'root'
})
export class TiсketsStorageService {
  private storage:ITour[]|undefined
  constructor(private ticketRestService:TicketRestService) { }
  setStorage(data: ITour[]): void {
    this.storage = data;
  }
  getStorage(): ITour[] {
      // возвращает в this.ticketStorage
      if (this.storage){
        return this.storage;
      }else{
        return [];
      }
  }
}
