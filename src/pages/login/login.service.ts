import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";
import {ConstService} from "../../app/constService";

@Injectable()
export class LoginService {

  constructor(private http: Http,
              public constService:ConstService) { 
  }


loginData(user: any) {
    const body = JSON.stringify(user);
    console.log("body" + body);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.constService.url+'auth/local', body, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError);
}
//Get Insurance ............
   getProfileData() {
     const headers = new Headers();
    let authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.constService.url+'api/users/me', {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

 upDateUserOneSignalID(data: any) {
    const body = JSON.stringify(data);
    console.log("body" + body);
    const headers = new Headers();
    let authToken = localStorage.getItem('token');
    headers.append('Authorization', authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.constService.url+'api/users/update/signalId', body, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError);
}


  //facebook login
  facebooklogin(user: any) {
    const body = user.access_token;
    localStorage.setItem('token', "bearer "+ user.token);
    localStorage.setItem('tokens',  user.token);
    return this.http.get('https://graph.facebook.com/v2.8/me?access_token='+body+'&fields=id,name,education,email,picture,first_name,gender,last_name')
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  //google login
  googlelogin(user: any) {
    const body = user.access_token;
    localStorage.setItem('token', "bearer "+ user.token);
    localStorage.setItem('tokens',  user.token);
    return this.http.get("https://www.googleapis.com/oauth2/v3/userinfo?access_token="+body)
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }


  setFacebookeData(user: any) {
      const body = JSON.stringify(user);
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post(this.constService.url+'api/users/auth/facebook/', body,{headers: headers})
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }



  setGoogleData(user: any) {
    const body = JSON.stringify(user);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.constService.url+'api/users/auth/google/', body,{headers: headers})
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }


   private handleError (error: any) {
    console.log(error);
    return Observable.throw(error.json());
  }

}