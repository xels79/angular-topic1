import { Injectable } from '@angular/core';
import { Observable, delay, map, of, switchMap, withLatestFrom } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { USERS } from 'src/app/shared/moks/users';

export interface ISettingsUsers {
  id?: string,
  fio?: string,
  citizenship?: string,
  bithDate?: string
}

@Injectable({
  providedIn: 'root'
})
export class SettingUsersService {

  constructor(private userService: UserService) { }

  getUsers(): Observable<ISettingsUsers[]> {

    const userArr: ISettingsUsers[] = Array.isArray( USERS ) ? [...USERS] : [];

    return of(userArr).pipe(
      withLatestFrom(this.userService.userBehSubject$),
      switchMap(([users, ownUser]) => {
        const newUser: ISettingsUsers = {fio: ownUser?.username || ''};
        return of( users.concat( [newUser] ) );
      }),

      map(arr => arr.filter( (item: ISettingsUsers)=>item.fio)),
      map( arr => arr.concat(arr)),

      delay(300)
    );
  }
}
