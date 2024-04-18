import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import ITour, { INearestTour, INearestTourExtend, ITourLocation } from 'src/app/models/ITour';
import { TiсketsStorageService } from 'src/app/services/tiсkets-storage/tiсkets-storage.service';
import { forkJoin, map } from 'rxjs';
import { TicketService } from 'src/app/services/ticket/ticket.service';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {
  ticket:ITour | undefined;
  userForm: FormGroup;
  //locations: INearestTourExtend[];
  nearestTours: INearestTourExtend[];
  constructor(
    private router: ActivatedRoute,
    private ticketStorage:TiсketsStorageService,
    private ticketService:TicketService
  ) { }

  ngOnInit(): void {
    //Параметры маршрутизации (id - тура)
    const id =this.router.snapshot.paramMap.get('id');
    if (id){
      this.ticket = this.ticketStorage.getStorage().find(item=>item.id === id);
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
    console.log(id,this.ticket);

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
