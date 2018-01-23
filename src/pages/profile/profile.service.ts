import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";
import {ConstService} from "../../app/constService";

@Injectable()
export class ProfileDetailsService {
headers = new Headers();
  constructor(private http: Http,
              public constService:ConstService) {
                  let authToken = localStorage.getItem('token');
                   this.headers.append('Authorization', authToken);
                   this.headers.append('Content-Type', 'application/json');
               }

//Get Insurance ............
   getProfileData() {
    return this.http.get(this.constService.url+'api/users/me', {
      headers: this.headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

//Update Profile ............
   updateProfile(profileData) {
     console.log(JSON.stringify(profileData) + 'data in json --------------');
     const body = JSON.stringify(profileData)
    return this.http.put(this.constService.url+'api/users/update',body ,{
      headers: this.headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }


   private handleError (error: any) {
    console.log(error);
    return Observable.throw(error.json());
  }

}