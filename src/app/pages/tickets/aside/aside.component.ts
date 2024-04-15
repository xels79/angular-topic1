import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IMenuType } from 'src/app/models/IMenuType ';
import { ITourTypeSelect } from 'src/app/models/ITourTypeSelect';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { TicketService } from 'src/app/services/ticket/ticket.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  menuTypes: IMenuType[];
  selectedMenuType: IMenuType;
  selectedTourType:ITourTypeSelect;
  selectedTourDate:string;
  private oldSelectedTourDate:string;
  tourTypes: ITourTypeSelect[] = [
    {label: 'Все', value: 'all'},
    {label: 'Одиночный', value: 'single'},
    {label: 'Групповой', value: 'multi'}
  ]
  @Output() changeMenuType = new EventEmitter<IMenuType>();
  constructor(
    private ticketService:TicketService,
    private messageService: MessageService,
    private settingService: SettingsService
  ) { }

  ngOnInit(): void {
    this.menuTypes = [
      {type: 'custom', label : 'Обычное'},
      {type: 'extended', label : 'Расширенное'},
    ];
  }
  onTypeChange(event:any){
    if (event.value){
      this.changeMenuType.emit(event.value as IMenuType);
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
