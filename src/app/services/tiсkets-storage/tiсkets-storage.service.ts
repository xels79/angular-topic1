import { Injectable } from '@angular/core';
import ITour from 'src/app/models/ITour';

@Injectable({
  providedIn: 'root'
})
export class TiсketsStorageService {
  private storage:ITour[]|undefined;

  constructor() { }

  setStorage(data: ITour[]): void {
    this.storage = data;
    window.localStorage.setItem('ang_schk_ticket_temp_store', JSON.stringify(data));
  }

  getStorage(): ITour[] {
    // возвращает в this.ticketStorage
    if (this.storage){
      return this.storage;
    }else{
      const storedString:string|null = window.localStorage.getItem('ang_schk_ticket_temp_store');
      if (storedString){
        return JSON.parse(storedString);
      }else{
        return [];
      }
    }
  }

}
