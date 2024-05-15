import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventType, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IBTour } from 'src/app/models/ITour';
import { TicketService } from 'src/app/services/ticket/ticket.service';

@Component({
  selector: 'app-tour-loader',
  templateUrl: './tour-loader.component.html',
  styleUrls: ['./tour-loader.component.scss']
})
export class TourLoaderComponent implements OnInit {
  tourForm: FormGroup;
  showLoading: boolean;
  constructor(
    private ticketService: TicketService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tourForm = new FormGroup({
      name: new FormControl<string>( '', {validators: Validators.required} ),
      description: new FormControl<string>( '', {validators: [Validators.required, Validators.minLength(20)]} ),
      tourOperator: new FormControl<string>( '' ),
      price: new FormControl<string>( '' ),
      img: new FormControl()
    });
    this.showLoading = false;
  }

  get name():FormControl{
    return this.tourForm.get('name') as FormControl;
  }

  get description():FormControl{
    return this.tourForm.get('description') as FormControl;
  }

  selectFile(event: Event): void {
    const el = event.currentTarget as HTMLInputElement;
    const fileList: FileList = el.files;
    console.log(fileList);
    if (fileList.length){
      this.tourForm.patchValue({
        img: fileList[0]
      });
    }
  }

  submit(){
    const rawData = this.tourForm.getRawValue();
    const formData = new FormData();
    if (typeof(rawData) === 'object'){
      for (let key in rawData){
        formData.append( key, rawData[key] );
      }
      this.showLoading = true;
      this.ticketService.createTour( formData ).subscribe( {
        next: answer=>{
          console.log(answer);
          this.ticketService.updateTickets( [] );
          this.messageService.add( {severity:'info', summary:'Информация', detail:'Тур успешнр добавлен'} );
          this.router.navigate(['/tickets/list']);
        },
        error: err=>{
          console.log(err);
        },
        complete:()=>{ this.showLoading = false; }
      } );
    }
  }
}
