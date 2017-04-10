import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import {Api} from "../../providers/api";
import {LiveIndentShowPage} from "../live-indent-show/live-indent-show";

/*
  Generated class for the LiveIndent page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-live-indent',
  templateUrl: 'live-indent.html'
})
export class LiveIndentPage {
  public requirements:any;
  public api_loaded:boolean = false;
  public reqPresent:boolean = false;

  constructor(public nav: NavController,
              public navParams: NavParams,
              public loadingCtrl:LoadingController,
              public toastCtrl:ToastController,public api:Api) {}

  ionViewDidLoad() {
    setTimeout(() => {
      let loading = this.loadingCtrl.create({
        content: 'Loading Requirements...'
      });
      let toast_none = this.toastCtrl.create({
        message: 'No Requirements Present. Please try again later.',
        duration: 2000,
        position: 'bottom',
        cssClass: 'red'
      });
      let toast_present = this.toastCtrl.create({
        message: 'Requirements Loaded Successfully!',
        duration: 2000,
        position: 'bottom',
        cssClass: 'green'
      });
      loading.present();
      this.api
          .loadRequirements()
          .then(requirements => {
            this.requirements = requirements;
              console.log(this.requirements);
              console.log(Object.keys(this.requirements).length);
            this.api_loaded = true;
            if(Object.keys(requirements).length > 0)
            {
              this.reqPresent = true;
              toast_present.present();
            }
            else
              toast_none.present();
            loading.dismiss();
          });
    },300);
  }
    viewRequirements(id) {
        this.nav.push(LiveIndentShowPage, {
            id: id
        });
    }

}
