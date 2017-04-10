import { Component } from '@angular/core';
import {Platform, NavParams, ViewController, LoadingController, NavController} from 'ionic-angular';
import {Api} from "../../providers/api";
import {TruckInMapPage} from "../truck-in-map/truck-in-map";
@Component({
  templateUrl: 'truckspage.html'
})
export class TrucksPage {
  character;
  trucks;
  constructor(
      public platform: Platform,
      public params: NavParams,
      public viewCtrl: ViewController,
      public loadingCtrl: LoadingController,
      public api:Api,public navCtrl:NavController
  ) {
    let loading = this.loadingCtrl.create({
      content: 'Loading Trucks...'
    });
    loading.present();
    this.api.getLocation().then((data) => {
      this.trucks =data;
    });
    loading.dismiss();
  }
  getTruck(truck){
    this.navCtrl.push(TruckInMapPage,{data:truck})
  }
}