import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscriber, Subscription, take, takeUntil } from 'rxjs';
import { ObservableExampleService } from 'src/app/services/observable-example/observable-example.service';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  // private subjectScope:Subject<string>;
  // private subjectUnsubscribe:Subscription;
  private unSubscribeDetector = new Subject<void>();
  private settingSubscription: Subscription;
  constructor(
    // private oExemple:ObservableExampleService
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    // this.subjectScope = this.oExemple.getSubject();
    // this.subjectUnsubscribe = this.subjectScope.subscribe(data=>{
    //   setTimeout(()=>{
    //     console.log("subject:", data);
    //   })
    // });
    // this.subjectScope.next("testing send data");
    this.settingsService.loadUserSettings().pipe(takeUntil(this.unSubscribeDetector)).subscribe(data=>{
      console.log("settigs data (loadUserSettings):", data);
    });
    this.settingsService.getSettingsSubjectObservable().pipe(takeUntil(this.unSubscribeDetector)).subscribe(data=>{
      console.log("settigs data from subject (getSettingsSubjectObservable):", data);
    });
  }
  ngOnDestroy(): void {
    // this.subjectUnsubscribe.unsubscribe();
    //this.settingSubscription.unsubscribe();
    this.unSubscribeDetector.next();
    this.unSubscribeDetector.complete();
  }

}
