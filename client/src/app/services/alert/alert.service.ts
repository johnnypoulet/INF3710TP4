import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { AlertInfo, ALERTTYPE } from 'src/app/shared/utils';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private readonly alertSubject: Subject<AlertInfo>;

  constructor() {
    this.alertSubject = new Subject<AlertInfo>();
  }
  getAlertObservable(): Observable<AlertInfo> {
    return this.alertSubject.asObservable();
  }

  sendAlert(message: string, alertType: ALERTTYPE, durationInMs: number): void {
    const alertMessage: AlertInfo = {
      message: message,
      alertType: alertType,
      durationInMs: durationInMs
    }
    this.alertSubject.next(alertMessage);
  }
}
