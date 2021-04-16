import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OneSignalService {

  constructor() { }

  async onLoad(): Promise<any> {
    window.OneSignal = window.OneSignal || [];
    return new Promise((resolve) => {
      window.OneSignal.push(function() {
        resolve(window.OneSignal);
      });
    });
  }

  onInit():void {
    this.onLoad().then((OneSignal)=>{
      OneSignal.init({
        appId: "8b210209-7548-4b39-84d1-07b037263557",
      });
    })
  }
}
