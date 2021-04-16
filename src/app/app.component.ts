import { Component, OnInit } from '@angular/core';
import { OneSignalService } from './one-signal.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'OneSignal-Angular';

  constructor(private os: OneSignalService){}
  
  ngOnInit() { 
    this.os.onInit();
  }
}
