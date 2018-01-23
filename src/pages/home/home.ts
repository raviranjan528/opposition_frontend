import { Component } from '@angular/core';
import {IonicPage, NavController, ToastController,NavParams, ViewController,ModalController,Platform, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { HomeService } from './home.service';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { CommentPage } from '../comment/comment';
import { RatingPage } from '../rating/rating';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HomeService]
})
export class HomePage {
postData: any;
username: any;
url1: any;
imageAvilable :any= 1;
users: any = {}
public uploader: CloudinaryUploader = new CloudinaryUploader(
  new CloudinaryOptions({ cloudName: 'dniwyifho', uploadPreset: 'eff7binz' })
);
  constructor(public navCtrl: NavController,
    public homeService: HomeService,
    private platform: Platform,
    public loadingController: LoadingController,
    public alertCtrl: AlertController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    private toastCtrl: ToastController,
  ) {
      this.OnGetMessage();
  }


  OnGetMessage(){
    this.homeService.getPostData().subscribe(res => {
      console.log("this.postData :::" + JSON.stringify(res))
        this.postData = res;
    })
  }

  OnPostMessage(form: NgForm){
       let loading = this.loadingController.create({
            content: ' Posting, Please Wait...'
        });
           loading.present();
           this.uploader.uploadAll();
           this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any) => {
            var cloudinaryImage = JSON.parse(response);
            this.users.imageUrl = cloudinaryImage.secure_url;
            this.users.publicId = cloudinaryImage.public_id;
            this.homeService.postPostData(this.users)
           .subscribe( (response) => { 
           
          this.OnGetMessage();
               {
                  let toast = this.toastCtrl.create({
                      message: 'Post Successful!',
                      duration: 3000,
                      position: 'bottom'
                  });

                  toast.onDidDismiss(() => {
                    console.log('Dismissed toast');
                  });

                  toast.present();
              }
              this.users.message = '';
              loading.dismiss();
        },
             (error) => { 
               loading.dismiss();
                      let alert = this.alertCtrl.create({
                          title: 'Post Failed',
                          subTitle: 'Invalid Data!',
                          buttons: ['OK']
                        });
                        alert.present();
                    }
      );
    }
    if(this.imageAvilable === 0){
      this.homeService.postPostData(this.users)
      .subscribe( (response) => { 
      
     this.OnGetMessage();
          {
             let toast = this.toastCtrl.create({
                 message: 'Post Successful!',
                 duration: 3000,
                 position: 'bottom'
             });

             toast.onDidDismiss(() => {
               console.log('Dismissed toast');
             });

             toast.present();
         }
         this.users.message = '';
         loading.dismiss();
   },
        (error) => { 
          loading.dismiss();
                 let alert = this.alertCtrl.create({
                     title: 'Post Failed',
                     subTitle: 'Invalid Data!',
                     buttons: ['OK']
                   });
                   alert.present();
               }
 );
}
  }





readUrl1(event) {

  if (event.target.files && event.target.files[0]) {
   var reader = new FileReader();
   console.log("fack path before upload : "+this.url1);
 
 reader.onload = (event:any) => {
   this.url1 = event.target.result;
   this.imageAvilable = 1;

   console.log("fack path : "+this.url1);
  }

 reader.readAsDataURL(event.target.files[0]);
 }


}


 ratingPage(postId) {
   let profileModal = this.modalCtrl.create(RatingPage, { postId: postId });
   profileModal.onDidDismiss(data => {
      this.OnGetMessage();
    })
         
 }

  commentPage(postId) {
   let profileModal = this.modalCtrl.create(CommentPage, { postId: postId });
   profileModal.onDidDismiss(data => {
      console.log(data);
      this.OnGetMessage();
         
 })
 }

}
