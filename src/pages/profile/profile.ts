import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController, AlertController, ToastController } from 'ionic-angular';
import {ProfileDetailsService } from './profile.service';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';

/**
 * Generated class for the ProfiledetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers:[ProfileDetailsService]
})
export class ProfilePage {
  public base64Image: string;
  isOn: boolean = false;
    public uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'dniwyifho', uploadPreset: 'eff7binz' })
  );
  oldPublicId:any;
profileData = {
  firstname: "",
  lastname: "",
  oldPublicId:"",
  publicId:"",
	phone: "",
	dob: "",
	gender: "",
  maritalStatus: "",
  user_image:"",
  lastEducation:{
	"degree": "",
	"college": "",
	"eduYear": "",
  "major": "",
  },
  currentJob:{
	"company": "",
	"department": "",
	"working": "",
  "position": ""
  }
};
url1:any='';
imageAvilable=0;
 constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public restService:ProfileDetailsService,
              public loadingController: LoadingController,
              public alertCtrl: AlertController, 
              private toastCtrl: ToastController) {
              let loading = this.loadingController.create({
                content: 'Loading...'
              });
               loading.present();
              this.restService.getProfileData().subscribe(res=>{
              loading.dismiss();
              this.profileData = res;
              console.log(res.publicId)
              if(res.publicId){
              
                this.oldPublicId = res.publicId;
              }
              console.log(res.lastEducation)
              if(res.lastEducation === undefined){
                this.profileData.lastEducation = {
                  "degree": "",
                  "college": "",
                  "eduYear": "",
                  "major": "",
                  }
                  this.profileData.currentJob = {
                    "company": "",
                    "department": "",
                    "working": "",
                    "position": ""
                    }
              }
             
              console.log(JSON.stringify(this.profileData)+"----------------------");
              this.url1 = res.user_image
    })
       this.uploader.onBeforeUploadItem = (item:any) =>{ 
         console.log("item Data ------------------");
         localStorage.setItem('image','image')
       }
  }


  Refreshpage(){
 let loading = this.loadingController.create({
                content: 'Refreshing,Please Wait...'
              });
               loading.present();
              this.restService.getProfileData().subscribe(res=>{
              loading.dismiss();
              console.log(JSON.stringify(res)+"----------------------");
              this.profileData = res;
              if(res.publicId){
                  this.oldPublicId = res.publicId;
                }
              this.url1 = res.user_image
    })
       this.uploader.onBeforeUploadItem = (item:any) =>{ 
         console.log("item Data ------------------");
         localStorage.setItem('image','image')
       }
      }

  //Save Insurance
  OnProfileSave(form:NgForm){
    let loading = this.loadingController.create({
                content: 'Updating...'
              });
               loading.present();
          this.uploader.uploadAll();
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any) => {
      //response is the cloudinary response
      //see http://cloudinary.com/documentation/upload_images#upload_response
      var cloudinaryImage = JSON.parse(response);
      this.profileData.user_image = cloudinaryImage.secure_url;
      this.profileData.publicId = cloudinaryImage.public_id;
      this.profileData.oldPublicId = this.oldPublicId
      console.log("this" + JSON.stringify(cloudinaryImage))
         this.restService.updateProfile(this.profileData).subscribe(res=>{
      loading.dismiss();
      console.log("done");
      localStorage.removeItem('image');
     // this.navCtrl.push(DashboardtabPage);
     this.Refreshpage();
                  {
                      let toast = this.toastCtrl.create({
                          message: 'Profile Updated Successful!',
                          duration: 3000,
                          position: 'bottom'
                      });

                      toast.onDidDismiss(() => {
                        console.log('Dismissed toast');
                      });

                      toast.present();
                  }
     })

    };
    if(this.imageAvilable == 0){
      this.profileData.oldPublicId = '';
     this.restService.updateProfile(this.profileData).subscribe(res=>{
      loading.dismiss();
      console.log("done");
     // this.navCtrl.push(DashboardtabPage);
     this.Refreshpage();
                  {
                      let toast = this.toastCtrl.create({
                          message: 'Profile Updated Successful!',
                          duration: 3000,
                          position: 'bottom'
                      });

                      toast.onDidDismiss(() => {
                        console.log('Dismissed toast');
                      });

                      toast.present();
                  }
     })
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

   onSkip(){
     this.navCtrl.push("HomePage")
   }
   password(){
    this.navCtrl.push("PasswordPage");
  }
}
