import { Component, OnInit } from '@angular/core';
import { ConfigService } from './services/config-service/config-service.service';
import { concat, concatMap, delay, exhaustMap, filter, fromEvent, map, mergeMap, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ticketSales2022';
  constructor(
    // private configService: ConfigService,
    // private userService: UserService
  ){}

  ngOnInit(): void {
    // // this.configService.configLoad();
    // const clicks = fromEvent<MouseEvent>(document, 'click');
    // clicks.pipe(
    //   tap((dt)=>{
    //     console.log("tap",dt);
    //   }),
    //   filter(dt=>{
    //     const el = dt.target as HTMLElement;
    //     return el.nodeName==='INPUT'
    //   }),
    //   map(dt=>{
    //     return dt.clientX;
    //   }),
    //   // switchMap(dt=>of(`sw ${dt}px`).pipe(
    //   //   delay(2000)
    //   // )),
    //   mergeMap(dt=>of(`me ${dt}px`).pipe(
    //     delay(2000)
    //   )),
    //   // concatMap(dt=>of(`cc ${dt}px`).pipe(
    //   //   delay(2000)
    //   // ))
    //   // exhaustMap(dt=>{
    //   //   console.log('ex map');
    //   //   return of(`ex ${dt}px`).pipe(
    //   //     delay(2000)
    //   //   );
    //   // }),
    //   withLatestFrom(this.userService.userBehSubject$),
    //   switchMap(([clientX, user])=>of({clientX, user})),
    //   tap(dt=>{console.log("tap2", dt)})
    // ).subscribe(dt=>{
    //   console.log("data subscribe: ", dt);
    // });
  }
}
