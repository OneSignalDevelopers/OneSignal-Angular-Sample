import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OneSignalService {
  private OneSignal = new BehaviorSubject<any>(null);
  objOneSignal = this.OneSignal.asObservable();

  constructor() {}
}
