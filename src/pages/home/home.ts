//Core Modules
import { Component } from '@angular/core';
import {NavController, LoadingController, Platform, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

//Services
import { Authentication } from '../../providers/authentication';

//TruckOwner Pages
// import { HomePage } from '../home-page/home-page';
import { MyApp } from '../../app/app.component';
import { TrucksPage } from '../truckspage/truckspage';

declare var navigator;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  public myForm : FormGroup;
  public show :boolean =  false;
  constructor(private builder: FormBuilder,
              private Auth: Authentication,
              public nav: NavController,
              public loadingCtrl: LoadingController,
              public platform :Platform,
              public alertCtrl:AlertController) {

  }

  ionViewDidEnter(){
    this.show = true;
    this.myForm = this.builder.group({
      email: "",
      password: ""
    });
  }
  onSubmit(formData) {
    let loading = this.loadingCtrl.create({
      spinner: 'ios'
    });
    loading.present(loading);
    let _self = this;
    this.Auth.signin(formData.value).then( role_data => {
      loading.dismiss();
      if( role_data == "owner" ){
        _self.nav.setRoot(MyApp);
      }else if( role_data == "transporter"){
        _self.nav.setRoot(TrucksPage);
      }else{
        this.loginErrorAlert();
      }
    }, function(error) {
      loading.dismiss();
      alert(error.message);
    });
  }
  loginErrorAlert() {
    console.log("enter");
    let alert = this.alertCtrl.create({
      title: 'InCorrect',
      message: 'User Name or Password Incorrect',
      buttons:[{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          alert.dismiss();
        }
      }
      ]
    });
    alert.present();
  }
}