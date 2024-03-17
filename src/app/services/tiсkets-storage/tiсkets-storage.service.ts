import { Injectable } from '@angular/core';
import ITour from 'src/app/models/ITour';

@Injectable({
  providedIn: 'root'
})
export class TiсketsStorageService {

  constructor() { }
  setStorage(data: ITour[]): void {
    // запись данных в this.ticketStorage
  }
  getStorage(): ITour[] {
      // возвращает в this.ticketStorage
      return [];
  }
}
