import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  isTabCaching:false;
  private unSubscribeDetector = new Subject<void>();
  constructor(
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    this.settingsService.loadUserSettings().pipe(takeUntil(this.unSubscribeDetector)).subscribe(data=>{
      console.log("settigs data (loadUserSettings):", data);
    });
    this.settingsService.getSettingsSubjectObservable().pipe(takeUntil(this.unSubscribeDetector)).subscribe(data=>{
      console.log("settigs data from subject (getSettingsSubjectObservable):", data);
    });
  }
  ngOnDestroy(): void {
    this.unSubscribeDetector.next();
    this.unSubscribeDetector.complete();
  }

}
