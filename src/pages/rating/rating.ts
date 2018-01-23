
import { Component } from '@angular/core';
import { IonicPage, NavController,ViewController, NavParams } from 'ionic-angular';
import { RatingService } from './rating.service';
import { NgForm } from '@angular/forms';
/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rating',
  templateUrl: 'rating.html',
  providers:[RatingService]
})
export class RatingPage {
postId: any;
postData: any[]=[];
post = {
	postID : "",
	rating :""
}
  constructor(public navCtrl: NavController,public viewCtrl: ViewController, public navParams: NavParams, public ratingService:RatingService) {
    this.postId = this.navParams.get('postId');
     this.getPostData();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }
   getPostData(){
   	 console.log('this.postId ::' + this.postId)
    this.ratingService.getPostData(this.postId).subscribe(res =>{
          this.postData =  res;
    })
    this.ratingService.getRATINGData(this.postId).subscribe(res =>{
    	console.log('res' + JSON.stringify(res))
          this.post.rating = res.rating
    })
   }

    dismiss() {
   this.viewCtrl.dismiss();
 }
onRatingChange(event){
	console.log('event ' + event)
	this.post.rating = event

}

   onRating(event){
   	console.log()
   	this.post.postID = this.postId
   	this.ratingService.postRatingData(this.post).subscribe(res =>{
         this.getPostData();
    })

   }
}