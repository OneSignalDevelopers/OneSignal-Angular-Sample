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
    this.os.init().then(()=> {
      this.OneSignal = this.os.getOneSignal();
    });
  }
  onSendTags() {
    console.log(this.OneSignal);
    this.OneSignal.sendTags({
        react: 'value',
      }, function(tagsSent) {
        console.log(tagsSent);
    });   
  }
}
