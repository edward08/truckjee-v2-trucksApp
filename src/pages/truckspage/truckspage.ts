//Core Modules
import { Component, ViewChild,ElementRef } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Authentication } from '../../providers/authentication'

declare var google;
@Component({
  selector: 'truckspage',
  templateUrl: 'truckspage.html'
})

export class TrucksPage {
  @ViewChild('map') mapElement:ElementRef;

  public map:any;
  constructor(public nav: NavController,
              public storage:Storage,
              public auth:Authentication,
              public loadingCtrl:LoadingController) {

  }
  ionViewDidEnter(){
    let loading = this.loadingCtrl.create({
      content: 'Loading Map...'
    });
    loading.present();
    var mapOptions = {
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: new google.maps.LatLng(20.5937, 78.9629),
      disableDefaultUI: true
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    loading.dismiss();
  }

}