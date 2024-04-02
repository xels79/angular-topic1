import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ObservableExampleService } from 'src/app/services/observable-example/observable-example.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  private subjectScope:Subject<string>;
  private subjectUnsubscribe:Subscription;
  constructor(private oExemple:ObservableExampleService) { }

  ngOnInit(): void {
    this.subjectScope = this.oExemple.getSubject();
    this.subjectUnsubscribe = this.subjectScope.subscribe(data=>{
      setTimeout(()=>{
        console.log("subject:", data);
      })
    });
    this.subjectScope.next("testing send data");

  }
  ngOnDestroy(): void {
    this.subjectUnsubscribe.unsubscribe();
  }

}
