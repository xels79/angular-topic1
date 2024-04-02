import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservableExampleService {
  private mySubject = new Subject<string>();
  constructor() { }

  getSubject(): Subject<string>{
    return this.mySubject;
  }
}
