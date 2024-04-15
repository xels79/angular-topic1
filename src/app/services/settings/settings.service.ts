import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ISettings } from 'src/app/models/ISettings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private settingSubject: Subject<ISettings> = new Subject<ISettings>();

  constructor() { }

  loadUserSettings():Observable<ISettings>{
    return new Observable<ISettings>(subscriber=>{
      const settingData:ISettings = {
        saveToken: true
      };
      subscriber.next(settingData);
    });
  }

  loadUserSetttingsSubject(data:ISettings):void{
    this.settingSubject.next(data);
  }

  getSettingsSubjectObservable(): Observable<ISettings> {
    return this.settingSubject.asObservable();
  }
}
