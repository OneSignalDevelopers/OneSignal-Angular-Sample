import { AfterViewInit, Component, OnInit } from '@angular/core';
import { OneSignalService } from './one-signal.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'OneSignal-Angular';
  OneSignal = null;
  constructor(private oneSignal: OneSignalService){
    oneSignal.onInit();
  }

  ngOnInit() { 
    this.oneSignal.objOneSignal.subscribe((OS)=>{
      this.OneSignal = OS;
    })
  }

  onSendTags(){
    this.OneSignal.sendTags({
        react: 'value',
      }, function(tagsSent) {
        console.log(tagsSent);
      });
  }
}

