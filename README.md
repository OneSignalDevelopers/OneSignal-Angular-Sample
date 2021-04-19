## Push Notification Integration In Angular

Notes: 
-This tutorial requires some basic knowledge on Angular
-I´m using Angular 11.2
-NodeJS version 14.0

Repo:

* [Quick setup](https://github.com/OneSignal/OneSignal-Angular)
* [Advanced setup](https://github.com/OneSignal/OneSignal-Angular/tree/FINAL-CODE)

**Create a new Angular project project using the Angular CLI**


### Quick Push Notification Setup In Angular

In your project folder, navigate to the *index.html* file and inside of the **head** html tag, paste the code you previously copied from the OneSignal page.

```html
<script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script>
<script>
  window.OneSignal = window.OneSignal || [];
  OneSignal.push(function() {
    OneSignal.init({
      appId: "YOUR-APP-ID",
    });
  });
</script>
```

Now, locate the SDK files you downloaded in your computer and insert them inside of the *src* folder of your Angular app.

![OneSignal SDK files](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/iydzj7p9h9rsme5hjg72.png)

After you have inserted the SDK files into your Angular project, we need to make Angular aware of those SDK files. Open the *angular.json* file and locate the architecture property and inside of that property you will see another property called assets, at the bottom of the property add the location of the OneSignal SDKs.

You angular.json should look like this:
```javascript
...
"assets": [
              "src/favicon.ico",
              "src/assets",
              "src/OneSignalSDKUpdaterWorker.js",
              "src/OneSignalSDKWorker.js",
            ],
...
```
### Time To The Permissions!

Run your Angular app and visit the app. After 3 seconds you should see the following prompt

![Push Prompt OneSignal](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/czst985cc532fp70dmmh.JPG)

Click on the blue button "Allow", then a browser prompt will ask you to allow to show notifications in your browser.

### Sending a Push Notifications

It{s time to send a Push Notification to the users of our application, to do so, go back to the OneSignal website and navigate to the Dashboard page. Once you are in the Dashboard page, click on the blue button that says "New Push".

![New Push OneSignal](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/e9h04k54vh2mhu865kt6.png)

You will be redirected to a new page that will allow you to change the configuration of your Push Notification. Make sure in the Audience step, "Send to Subscribed Users" is selected. On the second step, make sure to enter the required fields. On the third step the options "Immediately" and "Send to everyone at the same time" are selected. Finally, at the very bottom, click on the blue button that says "Review and Send".

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/c9w9f7pbhd45m2lpnwf5.png)

Time to review, a small popup will appear for you to review the message. After you have reviewed the message, click on the blue button "Send Message"

**You should have received a Push Notification in your device 🚀**

### Advance Push Notification Setup In Angular

If you want to take the Push Notifications to the next level and have the ability to use OneSignal across your entire Angular app, I will show you how to do so.

*Note: If you haven't completed the Quick Push Notification Setup, please make sure to do so.*

Inside of you *index.html* file, get rid of this code:

```html
<script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script>
<script>
  window.OneSignal = window.OneSignal || [];
  OneSignal.push(function() {
    OneSignal.init({
      appId: "YOUR-APP-ID",
    });
  });
</script>
```
}

In your root folder, create a new file called *grobals.ts*. I this file you will insert the following code:

``` javascript
export{}

declare global {
    interface Window {
      OneSignal: any;
    }
}
```

The code above will allow us to make use of `window.OneSignal` object without having to see any TS and compiler errors. Now that you have the globals.ts file created, import it into your *polyfills.ts* file.

```javascript
 import 'globals';
```
Time to create our OneSignal service inside of our Angular app. I have created one using the Angular CLI. The name of my service file is *one-signal.service.ts*. After creating the service, you will create an `onLoad()` method that will ensure that our SDK script we added inside of the *index.html* has been loaded since it{s an async operation.

```javascript
async onLoad(): Promise<any> {
    window.OneSignal = window.OneSignal || [];
    return new Promise((resolve) => {
      window.OneSignal.push(function() {
        resolve(window.OneSignal);
      });
    });
  }
```

In the OneSignal service, create a new method called `onInit()`. Inside of the method you will call the `onLoad()`and you will [initialize](https://documentation.onesignal.com/docs/web-push-sdk#initialization) OneSignal.

```javascript
onInit():void {
    this.onLoad().then((OneSignal)=>{
      OneSignal.init({
        appId: "YOUR-APP-ID",
      });
    })
  }
```

Finally, open your *app.component.ts* file and inject the OneSignal services you just created. Inside of the `gOnInit()` call the `onInit()` method from your OneSignal service. Your file will look like this:

```javascript
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
```

Now, you can keep expanding your code to make use of different features of the OneSignal SDK across your Angular app. To learn more about the Web Push SDK visit the[ OneSignal docs](https://documentation.onesignal.com/docs/web-push-sdk).