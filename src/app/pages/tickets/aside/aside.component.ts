import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription, take } from 'rxjs';
import { IMenuType } from 'src/app/models/IMenuType ';
import { ITourTypeSelect } from 'src/app/models/ITourTypeSelect';
import { MenuTypeService } from 'src/app/services/menu-type/menu-type.service';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { TicketService } from 'src/app/services/ticket/ticket.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit, OnDestroy {
  menuTypes: IMenuType[];
  selectedMenuType: IMenuType;
  selectedTourType:ITourTypeSelect;
  selectedTourDate:string;
  private MTSubscription: Subscription;
  private oldSelectedTourDate:string;
  tourTypes: ITourTypeSelect[] = [
    {label: 'Все', value: 'all'},
    {label: 'Одиночный', value: 'single'},
    {label: 'Групповой', value: 'multi'}
  ]
  // @Output() changeMenuType = new EventEmitter<IMenuType>();
  constructor(
    private ticketService:TicketService,
    private messageService: MessageService,
    private settingService: SettingsService,
    private menuTypeService: MenuTypeService
  ) { }

  ngOnInit(): void {
    this.menuTypes = [
      {type: 'custom', label : 'Обычное'},
      {type: 'extended', label : 'Расширенное'},
    ];
    this.MTSubscription = this.menuTypeService.getObservable().subscribe( dt=>{
      this.selectedMenuType = dt;
    });
  }
  ngOnDestroy(): void {
    this.MTSubscription.unsubscribe();
  }
  onTypeChange(event:any){
    if (event.value){
      this.menuTypeService.changeMenuType( event.value as IMenuType );
      // this.changeMenuType.emit(event.value as IMenuType);
    }
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
}
