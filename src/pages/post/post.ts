import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams, ViewController, ModalController, Platform, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { PostService } from './post.service';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { CommentPage } from '../comment/comment';
import { RatingPage } from '../rating/rating';

/**
 * Generated class for the PostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
  providers:[PostService]
})
export class PostPage {
  postData: any;
  username: any;
  url1: any;
  imageAvilable: any = 0;
  users: any = {}
  public uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'dniwyifho', uploadPreset: 'eff7binz' })
  );
  constructor(public navCtrl: NavController,
    public postService: PostService,
    private platform: Platform,
    public loadingController: LoadingController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    private toastCtrl: ToastController,
  ) { }



  OnPostMessage(form: NgForm) {
    let loading = this.loadingController.create({
      content: ' Posting, Please Wait...'
    });
    loading.present();
    this.uploader.uploadAll();
    const role = localStorage.getItem('role');
    this.users.postedBy = role;
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any) => {
      var cloudinaryImage = JSON.parse(response);
      this.users.imageUrl = cloudinaryImage.secure_url;
      this.users.publicId = cloudinaryImage.public_id;
      this.postService.postPostData(this.users)
        .subscribe((response) => {
          console.log('response' + JSON.stringify(response));
          if (response.flag == 0) {
            let alert = this.alertCtrl.create({
              title: 'Post Failed',
              subTitle: 'Please Provide Your Name,DOB,Gender,Profile Image First!',
              buttons: [
                {
                  text: 'OK',
                  handler: () => {
                    this.navCtrl.push("ProfilePage")
                    loading.dismiss();
                  }
                }
              ]
            });
            alert.present();
          }
          else {
            {
              let toast = this.toastCtrl.create({
                message: 'Post Successful!',
                duration: 3000,
                position: 'bottom'
              });
              this.viewCtrl.dismiss();
              toast.onDidDismiss(() => {
                console.log('Dismissed toast');
              });

              toast.present();
            }
            this.users.message = '';
            loading.dismiss();
          }
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
    if (this.imageAvilable === 0) {
      console.log('this.users' + JSON.stringify(this.users));
      this.postService.postPostData(this.users)
        .subscribe((response) => {
          console.log('response' + JSON.stringify(response));
          if (response.flag == 0) {
            let alert = this.alertCtrl.create({
              title: 'Post Failed',
              subTitle: 'Please Provide Your Name,DOB,Gender,Profile Image First!',
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
          else {
            {
              let toast = this.toastCtrl.create({
                message: 'Post Successful!',
                duration: 3000,
                position: 'bottom'
              });
              this.viewCtrl.dismiss();
              toast.onDidDismiss(() => {
                console.log('Dismissed toast');
              });

              toast.present();
            }
            this.users.message = '';
            loading.dismiss();
          }
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
      console.log("fack path before upload : " + this.url1);

      reader.onload = (event: any) => {
        this.url1 = event.target.result;
        this.imageAvilable = 1;

        console.log("fack path : " + this.url1);
      }

      reader.readAsDataURL(event.target.files[0]);
    }


  }
dismiss(){
  this.viewCtrl.dismiss();
}

}
