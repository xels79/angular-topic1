import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IMenuType } from 'src/app/models/IMenuType ';

@Injectable({
  providedIn: 'root'
})
export class MenuTypeService implements OnInit{

  private mType = new BehaviorSubject<IMenuType>({type: 'custom', label : 'Обычное'});
  constructor() {
    const tmp = window.localStorage.getItem('ang_schk_menu_type_store');
    console.log('MTService LCLS:', tmp);
    if (tmp){
      this.mType.next(JSON.parse(tmp));
    }
  }

  ngOnInit(): void {
    console.log('MTService OnInit.');
  }

  getObservable(): Observable<IMenuType>{
    return this.mType.asObservable();
  }

  changeMenuType(mt: IMenuType): void {
    window.localStorage.setItem( 'ang_schk_menu_type_store', JSON.stringify(mt) );
    this.mType.next( mt );
  }
}
