import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";
import { ConstService } from "../../app/constService";

@Injectable()
export class PostApprovalService {

    headers = new Headers();
  constructor(private http: Http,
              public constService:ConstService) {
                  let authToken = localStorage.getItem('token');
                   this.headers.append('Authorization', authToken);
                   this.headers.append('Content-Type', 'application/json');
               }

//Get Message ............
   getPostData() {
    return this.http.get(this.constService.url+'api/posts/allpost/by/admin', {
      headers: this.headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  
  // Post Message
  postPostData(id) {
      console.log("postDaat :: " + id)
      var postData = {approved:true}
    return this.http.put(this.constService.url+'api/posts/approved/by/admin/'+id, postData, {
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