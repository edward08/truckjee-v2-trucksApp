import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {Api} from "../../providers/api";
declare var google;
/*
  Generated class for the TruckInMap page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-truck-in-map',
  templateUrl: 'truck-in-map.html'
})
export class TruckInMapPage {
  @ViewChild('map') mapElement:ElementRef;
public data:any;
public map:any;
public truck_number:any;
public speed:any;
public timeIntervel:any;
public gpsUpdatedtime:any;
public truckMarkers: any = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public api:Api,
              public loadingCtrl:LoadingController) {
    this.data=navParams.get('data');
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Loading Map...'
    });
    loading.present();
    var mapOptions = {
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: new google.maps.LatLng(20.5937, 78.9629),
      mapTypeControl: true,
      draggable: true,
      disableDefaultUI: true
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addtruckMarker(this.data,1);
    loading.dismiss();
    this.timeIntervel=setInterval(()=>{
      this.oneTimeTruckInit();
    },15000);
  }

  public oneTimeTruckInit() {
    this.api.getLatLong().then((data) => {
      for(let i=0;i<Object.keys(data).length;i++){
        if(this.data.id==data[i].id){
          this.removetruckMarkers();
          this.addtruckMarker(data[i])
        }
      }
    });
  }
  removetruckMarkers() {
    for(let marker of this.truckMarkers)
      marker.setMap(null);
  }
  addtruckMarker(truck,center = null) {
    let truckIcon = 'assets/img/truck.png';
    if(truck)
    {
      this.speed=truck.gps_updated_speed;
      this.gpsUpdatedtime=truck.gps_updated_time;
      if(truck.gps_updated_speed==0)
      {
        truckIcon='assets/img/truckred.png'
      } else {
        truckIcon='assets/img/truckgreen.png'
      }
    }
    this.truck_number = truck.truck_number+' <br> '+truck.gps_updated_speed+' km/hr';
    let icon = {
      url: truckIcon, // url
      scaledSize: new google.maps.Size(25, 25), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    };
    var infowindow  = new google.maps.InfoWindow({
      content: this.truck_number
    });
    if(center != null)
    {
      this.map.setCenter(new google.maps.LatLng(truck.lat, truck.lng));
      this.map.setZoom(15);
    }
    let truckMarker = new google.maps.Marker({
      map: this.map,
      position: new google.maps.LatLng(truck.lat, truck.lng),
      icon: icon,
      animation: google.maps.Animation.DROP
    });
    truckMarker.addListener('click', function() {
      infowindow.open(this.map, truckMarker);
    });

    truckMarker.set('id', this.truck_number); // MVCObject()

    this.truckMarkers.push(truckMarker);
  }

}
