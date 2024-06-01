import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription, take } from 'rxjs';
import { IMenuType } from 'src/app/models/IMenuType ';
import ITour from 'src/app/models/ITour';
import { ITourTypeSelect } from 'src/app/models/ITourTypeSelect';
import { ConfigService } from 'src/app/services/config-service/config-service.service';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { TicketService } from 'src/app/services/ticket/ticket.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit, OnDestroy {
  menuTypes: IMenuType[];
  // selectedMenuType: IMenuType;
  selectedTourType:ITourTypeSelect;
  selectedTourDate:string;
  // private MTSubscription: Subscription;
  private oldSelectedTourDate:string;
  tourTypes: ITourTypeSelect[] = [
    {label: 'Все', value: 'all'},
    {label: 'Одиночный', value: 'single'},
    {label: 'Групповой', value: 'multi'}
  ]
  @Input() orderButtonsIsOperated: boolean = true;
  // @Output() changeMenuType = new EventEmitter<IMenuType>();
  constructor(
    private ticketService:TicketService,
    private messageService: MessageService,
    private settingService: SettingsService,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.menuTypes = [
      {type: 'custom', label : 'Обычное'},
      {type: 'extended', label : 'Расширенное'},
    ];
    this.ticketService.$ticketSubject.subscribe(data=>{
      this.selectedTourType = data;
    });
  }

  ngOnDestroy(): void {
  }

  changeTourType(ev:  {ev: Event, value: ITourTypeSelect}): void {
    if (this.selectedTourDate){
      this.ticketService.updateTour({...ev.value, date:this.selectedTourDate});
    }else{
      this.ticketService.updateTour(ev.value);
    }
  }

  checkDate(){
    if (this.selectedTourDate != this.oldSelectedTourDate){
      this.oldSelectedTourDate = this.selectedTourDate;
      if (this.selectedTourDate){
        this.ticketService.updateTour({date:this.selectedTourDate, ...this.selectedTourType});
      }else{
        this.ticketService.updateTour(this.selectedTourType);
      }
    }
  }

  initRestError(): void {
    this.ticketService.getError().subscribe({
      next:(data) => {},
      error:(err)=> {
        this.messageService.add({severity:"error",summary:`${err.status} - ошибка сервера`, detail:err.statusText});
      }
    });
  }

  initSettingData():void{
    this.settingService.loadUserSetttingsSubject({
      saveToken:false
    });
  }

  initTours(): void {
    this.http.post<ITour[]>(ConfigService.createURL('tours/'), {}).subscribe({
      next: data=>{ this.ticketService.updateTickets(data); console.log("Status ok:", data); },
      error: err=>{ console.log('error',err); }
    });
  }

  deleteTours(): void {
    this.http.delete(ConfigService.createURL('tours')).subscribe({
      next: data=>{ this.ticketService.updateTickets([]); console.log("Status ok:",data); },
      error: err=>{ console.log('error',err); }
    });
  }
}
