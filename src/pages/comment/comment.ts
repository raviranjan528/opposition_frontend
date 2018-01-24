import { Component } from '@angular/core';
import { IonicPage, NavController,ToastController,LoadingController,AlertController,ViewController, NavParams } from 'ionic-angular';
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
  constructor(public navCtrl: NavController,
   private toastCtrl: ToastController,
    public loadingController: LoadingController,
     public alertCtrl: AlertController,
     public viewCtrl: ViewController,
      public navParams: NavParams,
       public commentService:CommentService) {
    this.postId = this.navParams.get('postId');
     this.getPostData();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }
   getPostData(){
   	 console.log('this.postId ::' + this.postId)
   	 	let loading = this.loadingController.create({
            content: 'Loading Please Wait...'
        });
       loading.present();
    this.commentService.getPostData(this.postId).subscribe(res =>{
          console.log('res' + JSON.stringify(res))
             		if(res.flag == 0){
              let alert = this.alertCtrl.create({
                          title: 'Comment Failed',
                          subTitle: 'Please Provide Your Name,DOB,Gender,Profile Image,Mobile No,Email First!',
                          buttons: [
                              {
                                text: 'OK',
                                handler: () => {
                                 this.navCtrl.push("ProfilePage");
                                 loading.dismiss();
                                }
                              }
                            ]
                        });
                        alert.present();
           }
           else{
           this.postData =  res;
               {
                  let toast = this.toastCtrl.create({
                      message: 'Comment Successful Added!',
                      duration: 3000,
                      position: 'bottom'
                  });

                  toast.onDidDismiss(() => {
                    console.log('Dismissed toast');
                  });

                  toast.present();
              }
              this.post.message = '';
              loading.dismiss();
            }
    })
   }

    dismiss() {
   this.viewCtrl.dismiss();
 }

   OnComment(form: NgForm){
   	let loading = this.loadingController.create({
            content: ' Posting, Please Wait...'
        });
   	loading.present();
   	this.post.postID = this.postId
   	this.commentService.postCommentData(this.post).subscribe(res =>{
   		      console.log('res' + JSON.stringify(res));
   		if(res.flag == 0){
              let alert = this.alertCtrl.create({
                          title: 'Comment Failed',
                          subTitle: 'Please Provide Your Name,DOB,Gender,Profile Image,Mobile No,Email First!',
                          buttons: [
                              {
                                text: 'OK',
                                handler: () => {
                                 this.navCtrl.push("ProfilePage");
                                 loading.dismiss();
                                }
                              }
                            ]
                        });
                        alert.present();
           }
           else{
           this.getPostData();
               {
                  let toast = this.toastCtrl.create({
                      message: 'Comment Successful Added!',
                      duration: 3000,
                      position: 'bottom'
                  });

                  toast.onDidDismiss(() => {
                    console.log('Dismissed toast');
                  });

                  toast.present();
              }
              this.post.message = '';
              loading.dismiss();
            }
        
    })

   }
}
