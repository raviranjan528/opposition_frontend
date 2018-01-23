import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";
import { ConstService } from "../../app/constService";

@Injectable()
export class UserListService {

    headers = new Headers();
  constructor(private http: Http,
              public constService:ConstService) {
                  let authToken = localStorage.getItem('token');
                   this.headers.append('Authorization', authToken);
                   this.headers.append('Content-Type', 'application/json');
               }

//Get Message ............

getProfileData() {
  return this.http.get(this.constService.url+'api/users/me', {
    headers: this.headers
  })
    .map((data: Response) => data.json())
    .catch(this.handleError);
}

   getUserListData() {
       console.log('here we are')
    return this.http.get(this.constService.url+'api/users/get/userlist/byname', {
      headers: this.headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }
  // Post Message
  followUser(id) {
    var body =  {'userId' : id}
    return this.http.post(this.constService.url+'api/users/follwed/by/userid', body, {
      headers: this.headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  unfollowUser(id){
    var body =  {'userId' : id}
    return this.http.post(this.constService.url+'api/users/unfollwed/by/userid', body, {
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