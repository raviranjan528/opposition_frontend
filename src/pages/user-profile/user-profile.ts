import { Component } from '@angular/core';
import { IonicPage, NavController,ViewController, NavParams, LoadingController } from 'ionic-angular';
import {UserProfileDetailsService } from './user-profile.service';
/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
  providers:[UserProfileDetailsService]
})
export class UserProfilePage {
userId:any;
url1:any;
profileData:any = {}
  constructor(public navCtrl: NavController,
  public restService:UserProfileDetailsService,
  public viewCtrl: ViewController,
              public loadingController: LoadingController,
               public navParams: NavParams) {
  	this.userId = this.navParams.get('userId');
              this.restService.getProfileData(this.userId).subscribe(res=>{
              console.log(JSON.stringify(res) + 'response')
              this.profileData = res;
              this.url1 = res.user_image
          })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
  }
    dismiss() {
   this.viewCtrl.dismiss();
 }


}
