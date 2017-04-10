import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class Authentication {
    // url:string = "http://demo.truckjee.com/api";
    url:string = "http://127.0.0.1:8000/api";
    current_user:string;
    public userToken;
    private headers = new Headers();

    constructor(public http:Http,
                public storage:Storage) {
        this. headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.isAuthenticated();
    }

    isAuthenticated() {
        return this.storage.get("current_user").then((value) => {
            if (value)
                this.userToken = value.token;
            return value;
        });
    }

    signin(signinData) {
        return new Promise((resolve, reject) => {
            let creds = `?email=${signinData.email}&password=${signinData.password}`;
            this.http.post(`${this.url}/login${creds}`, JSON.stringify(signinData))
                .subscribe(res => {
                    let data = res.json();
                    if(data.api_token) {
                        this.current_user = data.api_token;
                        if (data.token.roles[0].id == 3) {
                            this.storage.set('current_user', {token: this.current_user, role: "owner"});
                            return resolve('owner');
                        }
                        else if (data.token.roles[0].id == 2) {
                            this.storage.set('current_user', {token: this.current_user, role: "transporter"});
                            return resolve('transporter');
                        }
                    }else
                        return resolve('anauthenticated');
                }, (err) => {
                    console.log(err);
                    reject(err.json());
                });
        });
    }
    signOut() {
        this.storage.remove('current_user');
        this.storage.clear();
    }
}