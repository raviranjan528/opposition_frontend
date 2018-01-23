import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";
import { ConstService } from "../../app/constService";

@Injectable()
export class CommentService {

    headers = new Headers();
  constructor(private http: Http,
              public constService:ConstService) {
                  let authToken = localStorage.getItem('token');
                   this.headers.append('Authorization', authToken);
                   this.headers.append('Content-Type', 'application/json');
               }

//Get Message ............
   getPostData(id) {
    return this.http.get(this.constService.url+'api/posts/'+id, {
      headers: this.headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }
  // Post Message
  postCommentData(postDaat) {
      console.log("postDaat :: " + postDaat)
    return this.http.post(this.constService.url+'api/comments', postDaat, {
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