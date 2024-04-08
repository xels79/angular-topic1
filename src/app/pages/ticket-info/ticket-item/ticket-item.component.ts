import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import ITour from 'src/app/models/ITour';
import { TiсketsStorageService } from 'src/app/services/tiсkets-storage/tiсkets-storage.service';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {
  ticket:ITour | undefined;
  userForm: FormGroup;
  constructor(
    private router: ActivatedRoute,
    private ticketStorage:TiсketsStorageService
  ) { }

  ngOnInit(): void {
    const id =this.router.snapshot.paramMap.get('id');
    if (id){
      this.ticket = this.ticketStorage.getStorage().find(item=>item.id === id);
    }
    this.userForm = new FormGroup({
      firstName:  new FormControl('', { validators: Validators.required }),
      lastName:   new FormControl('', [ Validators.required, Validators.minLength(2) ]),
      cardNumber: new FormControl(),
      birthDay:   new FormControl(),
      age:        new FormControl(22),
      citizen:    new FormControl()
    });
    console.log(id,this.ticket);
  }

  get firstName():FormControl{
    return this.userForm.get('firstName') as FormControl;
  }
  get lastName():FormControl{
    return this.userForm.get('lastName') as FormControl;
  }

}
