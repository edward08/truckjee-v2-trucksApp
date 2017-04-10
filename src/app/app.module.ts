import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Authentication } from "../providers/authentication";
import {TrucksPage} from "../pages/truckspage/truckspage";
import { IonicStorageModule } from '@ionic/storage';
import {Api} from "../providers/api";
import {sessionCheck} from "../providers/session-check";
import {TruckInMapPage} from "../pages/truck-in-map/truck-in-map";
import {LiveIndentPage} from "../pages/live-indent/live-indent";
import {LiveIndentShowPage} from "../pages/live-indent-show/live-indent-show";
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TrucksPage,
    TruckInMapPage,
    LiveIndentPage,
    LiveIndentShowPage

  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TrucksPage,
    TruckInMapPage,
    LiveIndentPage,
    LiveIndentShowPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Authentication,
    Api,
    sessionCheck
  ]
})
export class AppModule {}
