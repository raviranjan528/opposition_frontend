import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";
import {ConstService} from "../../app/constService";

@Injectable()
export class UserProfileDetailsService {
headers = new Headers();
  constructor(private http: Http,
              public constService:ConstService) {
                  let authToken = localStorage.getItem('token');
                   this.headers.append('Authorization', authToken);
                   this.headers.append('Content-Type', 'application/json');
               }

//Get Insurance ............
   getProfileData(id) {
    return this.http.get(this.constService.url+'api/users/get/userProfile/by/'+id, {
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