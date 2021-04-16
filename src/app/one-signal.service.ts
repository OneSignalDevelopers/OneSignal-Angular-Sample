import { Injectable } from '@angular/core';

declare global {
  interface Window {
    OneSignal: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class OneSignalService {

  constructor() { }

  async getInstance(): Promise<any> {
    console.log("serv");
    window.OneSignal = window.OneSignal || [];
    return new Promise((resolve) => {
      window.OneSignal.push(function() {
        resolve(window.OneSignal);
      });
    });
  }
}
