import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ICustomStatisticUser, IStatisticUser } from 'src/app/models/IUser';
import { StatisticRestService } from '../rest/statistic-rest.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor( private restService: StatisticRestService) { }
  getStatistic():Observable<ICustomStatisticUser[]> {
    return this.restService.getUsersStatistic().pipe(
      map( data => {
        return data.map( item=>{
          return <ICustomStatisticUser>{
            name: item.name,
            company: item.company.name,
            phone: item.phone,
            id: item.id,
            city: item.address.city,
            street: item.address.street
          }
        })
      })
    );
  }
}
