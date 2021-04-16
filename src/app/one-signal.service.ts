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
  private OneSignal = null;
  constructor() { }

  async getInstance(): Promise<any> {
    window.OneSignal = window.OneSignal || [];

    return new Promise((resolve) => {
      window.OneSignal.push(function() {
        resolve(window.OneSignal);
      });
    });
  }

      // Call this method to start the onesignal process.
  init():Promise<any> {
    return new Promise((resolve) => {
    this.addScript('https://cdn.onesignal.com/sdks/OneSignalSDK.js',
          (callback) => {
            console.log('OneSignal Script Loaded');
            window.OneSignal.push(()=> {
              this.initOneSignal();
              resolve(window.OneSignal);
            });
        });
      });
    }

    async addScript(fileSrc, callback) {
        const head = document.getElementsByTagName('head')[0];
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.onload = callback;
        script.src = fileSrc;
        head.appendChild(script);
    }

    initOneSignal() {
      this.OneSignal = window['OneSignal'] || [];
      this.OneSignal.init({
        appId: "8b210209-7548-4b39-84d1-07b037263557",
      });
    }

    getOneSignal(): any {
      return this.OneSignal;
    }
}


