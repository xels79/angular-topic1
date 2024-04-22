import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStatisticUser } from 'src/app/models/IUser';

@Injectable({
  providedIn: 'root'
})
export class StatisticRestService {

  constructor( private http: HttpClient ) { }

  getUsersStatistic():Observable<IStatisticUser[]> {
    return this.http.get<IStatisticUser[]>('https://jsonplaceholder.typicode.com/users');
  }
}
