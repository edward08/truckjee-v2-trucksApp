import { Component,ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { TrucksPage } from '../pages/truckspage/truckspage';
import { Authentication } from '../providers/authentication';
import {sessionCheck} from "../providers/session-check";
import {LiveIndentPage} from "../pages/live-indent/live-indent";


@Component({
  selector: 'app',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;
  pages = [
    { title: 'Sign In', component: HomePage }
  ];
  ownerPages = [];
  transporterPages = [];
  is_logged_in:boolean;
  public assumedRole: string = "";

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public loadingCtrl:LoadingController,
              public auth:Authentication,public session:sessionCheck) {
    let loading = loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();

    platform.ready().then(() => {
      this.registerBackButtonListener();
      statusBar.styleDefault();
      splashScreen.hide();
      auth.isAuthenticated().then((data) => {
        console.log(data);
        if(data != null)
        {
          this.is_logged_in = true;
          this.assumedRole = data.role;
          console.log(this.assumedRole);
          this.handlePagesByRole();
          if(data.role == "owner")
          {
            this.nav.setRoot(TrucksPage);
            loading.dismiss();
          }
          else
          {
            this.nav.setRoot(HomePage);
            loading.dismiss();
          }
        }
        else
        {
          this.is_logged_in = false;
          this.nav.setRoot(HomePage);
          loading.dismiss();
        }
      });
    });
    session.getEmittedValue().subscribe(data => {
      console.log("session");
      this.assumedRole = data;
      this.is_logged_in = true;
      this.handlePagesByRole();
    });
  }
  registerBackButtonListener() {
    document.addEventListener('backbutton', () => {
      if(this.nav.length() == 1) {
        if(this.assumedRole == "owner") {
          this.nav.setRoot(TrucksPage);
        }
        else if(this.assumedRole == "transporter") {
          this.nav.setRoot(HomePage);
        }
      }
    });
  }
  handlePagesByRole()
  {
    if( this.assumedRole == "owner" )
    {
      this.ownerPages = [
        { title: 'Trucks', component: TrucksPage },
        { title: 'Indents', component: LiveIndentPage }
      ];
    }
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  signOut(){
        this.is_logged_in = false;
        this.auth.signOut();
        this.nav.setRoot(MyApp);
  }
}
