import { Component } from '@angular/core';
import { IonicPage, NavController,ViewController, NavParams } from 'ionic-angular';
import { CommentService } from './comment.service';
import { NgForm } from '@angular/forms';
/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
  providers:[CommentService]
})
export class CommentPage {
postId: any;
postData: any[]=[];
post = {
	postID : "",
	message :""
}
  constructor(public navCtrl: NavController,public viewCtrl: ViewController, public navParams: NavParams, public commentService:CommentService) {
    this.postId = this.navParams.get('postId');
     this.getPostData();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }
   getPostData(){
   	 console.log('this.postId ::' + this.postId)
    this.commentService.getPostData(this.postId).subscribe(res =>{
          this.postData =  res;
    })
   }

    dismiss() {
   this.viewCtrl.dismiss();
 }

   OnComment(form: NgForm){
   	this.post.postID = this.postId
   	this.commentService.postCommentData(this.post).subscribe(res =>{
         this.getPostData();
    })

   }
}
