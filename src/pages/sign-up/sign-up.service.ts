import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Rx";
import {ConstService} from "../../app/constService";

@Injectable()
export class SignupService {

    constructor(private http: Http,
                public constService:ConstService) {}


    loginData(user: any) {
        const body = JSON.stringify(user);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.constService.url+'api/users', body, {
            headers: headers
        })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }



    //facebook login
    facebooklogin(user: any) {
        const body = user.access_token;
        return this.http.get('https://graph.facebook.com/v2.8/me?access_token=' + body + '&fields=id,name,education,email,picture,first_name,gender,last_name')
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }



    //google login
    googlelogin(user: any) {
        const body = user.access_token;
        return this.http.get("https://www.googleapis.com/oauth2/v3/userinfo?access_token=" + body)
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }


    setFacebookeData(user: any) {
        const body = JSON.stringify(user);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.constService.url+'api/users/auth/facebook/', body, {headers: headers})
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }

    setGoogleData(user: any) {
        const body = JSON.stringify(user);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.constService.url+'api/users/auth/google/', body, {headers: headers})
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }



        private handleError(error: any) {
            console.log(error);
            return Observable.throw(error.json());
        }

}