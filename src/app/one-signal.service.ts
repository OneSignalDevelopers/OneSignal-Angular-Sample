import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';

declare global {
  interface Window {
    OneSignal: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class OneSignalService {
  private OneSignal = new BehaviorSubject<any>(null);
  objOneSignal = this.OneSignal.asObservable();

  constructor() { }

  onLoad(): Observable<any> {
    window.OneSignal = window.OneSignal || [];
    const osInit = new Promise((resolve) => {
      window.OneSignal.push(function() {
        resolve(window.OneSignal);
      });
    });
    //from makes a promise an observable
    return from(osInit);
  }


  onInit(): void {
    this.onLoad().subscribe((os)=>{
      os.init({
        appId: "8b210209-7548-4b39-84d1-07b037263557",
      });
      this.setOneSignal(os)
    });
  }

  setOneSignal(os: any): void {
    this.OneSignal.next(os);
  }
}