import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// import { Storage } from '@ionic/storage';
import {Authentication} from '../providers/authentication';
import 'rxjs/add/operator/map';
@Injectable()
export class Api {
    url = "http://127.0.0.1:8000/api";
    data:any = null;
    r:any;
    truckList:any = null;
    private headers = new Headers();
    public userToken;
    public allRequirements;

    constructor(public http: Http, public auth:Authentication) {
        this.headers.append('Accept','application/json');
        this.auth.isAuthenticated().then((data) => {
            if(data != null)
                this.userToken = data.token;
            let str1 = 'Bearer';
            let str2 = this.userToken;
            let bearerToken = str1.concat(" ").concat(str2);
            this.headers.append('Authorization',bearerToken);
        });
    }
    getLatLong(){
        return new Promise(resolve => {
            this.auth.isAuthenticated().then((data) => {
                this.userToken = data.token;
                this.http.get(`${this.url}/get-latLong`,{headers:this.headers})
                    .map(res => {
                        return res.json();
                    })
                    .subscribe(trucks => {
                        this.truckList = trucks;
                        resolve(this.truckList);
                    });
            });
        });
    }

    getLocation(){
        return new Promise(resolve => {
            this.auth.isAuthenticated().then((data) => {
                this.http.get(`${this.url}/get-location`,{headers:this.headers})
                    .map(res => {
                        return res.json();
                    })
                    .subscribe(trucks => {
                        this.truckList = trucks;
                        resolve(this.truckList);
                    });
            });
        });
    }

    loadRequirements(){
        return new Promise(resolve => {
            this.auth.isAuthenticated().then((data) => {
                let status="live";
                this.userToken = data.token;
                this.http.get(`${this.url}/indents?${status}`,{headers:this.headers})
                    .map(res => {
                        return res.json();
                    })
                    .subscribe(requirements => {
                        this.allRequirements = requirements;
                        console.log(this.allRequirements);
                        resolve(this.allRequirements);
                    },(err) => {
                        return resolve(false);
                    });
            });
        });
    }
}