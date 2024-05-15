import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, EventType, Router } from '@angular/router';
import ITour, { INearestTour, INearestTourExtend, ITourLocation } from 'src/app/models/ITour';
import { TiсketsStorageService } from 'src/app/services/tiсkets-storage/tiсkets-storage.service';
import { Observable, Subscription, delay, forkJoin, from, fromEvent, iif, map, of, switchMap, takeLast } from 'rxjs';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { IOrder } from 'src/app/models/IOrder';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit, AfterViewInit, OnDestroy {
  ticket:ITour | undefined;
  userForm: FormGroup;
  //locations: INearestTourExtend[];
  nearestTours: ITour[];//INearestTourExtend[];
  @ViewChild('ntSearchElement') ntSearchElement: ElementRef;
  showLoader: boolean;
  showLoader2:boolean;
  private NTSESubscribtion: Subscription;
  private ticketRestSub: Subscription;
  private needRefresh: boolean;
  private httpSubscription: Subscription;

  constructor(
    private router: ActivatedRoute,
    //private ticketStorage:TiсketsStorageService,
    private ticketService:TicketService,
    private messageService: MessageService,
    private authService: AuthService,
    private mainRouter: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    //Параметры маршрутизации (id - тура)
    const id =this.router.snapshot.paramMap.get('id');
    this.showLoader = true;
    this.showLoader2 = true
    if (id){
      //this.ticket = this.ticketStorage.getStorage().find(item=>item.id === id);
      this.ticketService.getTicket( id ).subscribe({
        next: data=>{ this.ticket = data; },
        error: err=>{
          if (err.status === 404) {
            this.messageService.add({severity: 'error', summary: 'Ошибка', detail: 'Тур ненайден.'});
            this.mainRouter.navigate(['/tickets/notfound']);
          }else{
            console.log("Ошибка.");
          }
        },
        complete: ()=>{ this.showLoader = false; }
      });
    }
    //Форма
    this.userForm = new FormGroup({
      firstName:  new FormControl('', { validators: Validators.required }),
      lastName:   new FormControl('', [ Validators.required, Validators.minLength(2) ]),
      cardNumber: new FormControl(),
      birthDay:   new FormControl(),
      age:        new FormControl(22, { validators:Validators.min(21) }),
      citizen:    new FormControl()
    });
    console.log('init',id,this.ticket);

    //Ближайшие туры
     //forkJoin([this.ticketService.getNearestTours(), this.ticketService.getToursLocation()]).pipe();
    //   map(data=>
    //       data[0].map(tourItem=>{
    //         const tnExtends:INearestTourExtend = tourItem;
    //         tnExtends.country = data[1].find( locationItem=>tourItem.locationId === locationItem.id);
    //         return tnExtends;
    //       })
    //   )
    // )
    this.ticketService.getTickets().subscribe({
      next: data=>{
        console.log(data);
        this.nearestTours = data;
      },
      error: error=>{
        console.log(error);
        this.nearestTours = [];
      },
      complete: ()=>{ this.showLoader2 = false; }
    });
    this.needRefresh = false;
  }

  ngAfterViewInit(): void {
    this.NTSESubscribtion = fromEvent<KeyboardEvent>(this.ntSearchElement.nativeElement, 'keyup').subscribe((ev)=>{
      const input = ev.target as HTMLInputElement;
      console.log('ku',input.value);
      this.initSearchTour( input.value );
    });
  }

  ngOnDestroy(): void {
    this.NTSESubscribtion.unsubscribe();
  }

  initSearchTour(name: string){
    forkJoin([of(name), of(this.needRefresh)]).pipe(
      delay(1000),
      takeLast(1),
      switchMap(data=>{
        if (data[0].length>2){
          this.needRefresh = true;
          return this.ticketService.getTicketsByName( data[0] );
        }else if (data[1]){
          this.needRefresh = false;
          return this.ticketService.getTickets();
        }else{
          return of(this.nearestTours);
        }
      })
    ).subscribe({
      next: data=>{
        this.nearestTours = data;
      },
      error: error=>{
        console.log('Ошибка', error);
      },
      complete: ()=>{ this.showLoader2 = false; }
    });
    // let httpObser: Observable<ITour[]>;
    // if (name.length > 2){
    //   this.needRefresh = true;
    //   httpObser = this.ticketService.getTicketsByName( name );
    // }else if ( this.needRefresh ) {
    //   this.needRefresh = false;
    //   httpObser = this.ticketService.getTickets();
    // }
    // if (httpObser){
    //   if (this.httpSubscription && !this.httpSubscription.closed){
    //     this.httpSubscription.unsubscribe();
    //   }
    //   this.showLoader2 = true;
    //   this.httpSubscription = httpObser.subscribe({
    //     next: data=>{
    //       this.nearestTours = data;
    //     },
    //     error: error=>{
    //       console.log('Ошибка', error);
    //     },
    //     complete: ()=>{ this.showLoader2 = false; }
    //   });
    // }
  }
  sendOrderClick():void{
    const data = this.userForm.getRawValue();
    const postData = { ...this.ticket, ...data };
    const userID = this.userService.getUser()._id || null;
    //console.log('ticket', this.ticket);
    //console.log('postData', this.ticket);
    const postObj: IOrder = {
      age: postData.age,
      birthDay: postData.birthDay,
      cardNumber: postData.cardNumber,
      tourId: postData.id,
      userId: userID
    };
    console.log(postObj);
    this.ticketService.sendOrder( postObj ).subscribe();
  }
  get firstName():FormControl{
    return this.userForm.get('firstName') as FormControl;
  }
  get lastName():FormControl{
    return this.userForm.get('lastName') as FormControl;
  }
  get age():FormControl{
    return this.userForm.get('age') as FormControl;
  }

  createUrl( url: string): string {
    return this.ticketService.createUrl( url );
  }

}
