import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../services/alert/alert.service';
import { AlertInfo, ALERTTYPE } from '../shared/utils';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnDestroy {

  alertInfo: AlertInfo;

  newMessage: boolean;
  private alertSubscription: Subscription;
  constructor(private alertService: AlertService) {
    this.alertInfo = {
      alertType: ALERTTYPE.DEFAULT,
      message: "",
      durationInMs: 0
    };
    this.newMessage = false;
    this.alertSubscription = this.alertService.getAlertObservable().subscribe((alertInfo: AlertInfo) => {
      this.newMessage = true;
      this.alertInfo = alertInfo;
      setTimeout(() => {
        this.close();
      }, this.alertInfo.durationInMs);
    });
  }

  ngOnDestroy(): void {
    this.alertSubscription.unsubscribe();
  }
  
  close():void{
    this.newMessage=false;
  }


  getType(): string {
    switch (this.alertInfo.alertType) {
      case ALERTTYPE.SUCCESS: {
        return "success";
      }
      case ALERTTYPE.ERROR: {
        return "danger";
      }
      case ALERTTYPE.WARNING: {
        return "warning";
      }
      default: {
        return "success";
      }
    }
  }

}
