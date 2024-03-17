import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IMenuType } from 'src/app/models/IMenuType ';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  menuTypes: IMenuType[];
  selectedMenuType: IMenuType;
  @Output() changeTourType = new EventEmitter<IMenuType>();
  constructor() { }

  ngOnInit(): void {
    this.menuTypes = [
      {type: 'custom', label : 'Обычное'},
      {type: 'extended', label : 'Расширенное'},
    ];
  }
  onTypeChange(event:any){
    if (event.value){
      this.changeTourType.emit(event.value as IMenuType);
    }
  }

}
