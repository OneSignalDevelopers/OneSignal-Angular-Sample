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
  constructor(private os: OneSignalService){
  }
  ngOnInit() { 
    this.os.getInstance().then((OS)=>{
      this.OneSignal = OS;
      this.OneSignal.init({
        appId: "8b210209-7548-4b39-84d1-07b037263557",
      });
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
