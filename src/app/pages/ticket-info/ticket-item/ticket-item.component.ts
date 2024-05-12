import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ITour, { INearestTour, INearestTourExtend, ITourLocation } from 'src/app/models/ITour';
import { TiсketsStorageService } from 'src/app/services/tiсkets-storage/tiсkets-storage.service';
import { Subscription, forkJoin, fromEvent, map } from 'rxjs';
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
  nearestTours: INearestTourExtend[];
  @ViewChild('ntSearchElement') ntSearchElement: ElementRef;
  private NTSESubscribtion: Subscription;
  private ticketRestSub: Subscription;

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
        }
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
    forkJoin([this.ticketService.getNearestTours(), this.ticketService.getToursLocation()]).pipe(
      map(data=>
          data[0].map(tourItem=>{
            const tnExtends:INearestTourExtend = tourItem;
            tnExtends.country = data[1].find( locationItem=>tourItem.locationId === locationItem.id);
            return tnExtends;
          })
      )
    ).subscribe(data=>{
      console.log(data);
      this.nearestTours = data;
    })
  }

  ngAfterViewInit(): void {
    this.NTSESubscribtion = fromEvent(this.ntSearchElement.nativeElement, 'keyup').subscribe((ev)=>{
      console.log('ku');
      this.initSearchTour();
    });
  }

  ngOnDestroy(): void {
    this.NTSESubscribtion.unsubscribe();
  }

  initSearchTour(){
    const type = Math.floor( Math.random() * 3);
    if (this.ticketRestSub && !this.ticketRestSub.closed) {
      this.ticketRestSub.unsubscribe();
    }
    this.ticketRestSub = forkJoin([this.ticketService.getRandomNearestTours( type ), this.ticketService.getToursLocation()]).pipe(
      map( data=>{
        const tnExtends:INearestTourExtend = data[0];
        tnExtends.country = data[1].find( locationItem=>data[0].locationId === locationItem.id);
        return tnExtends;
      })
    ).subscribe( data=>{
      console.log(data);
      this.nearestTours = [ data ];
    });
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

}
