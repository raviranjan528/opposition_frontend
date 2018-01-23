import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController, AlertController, ToastController } from 'ionic-angular';
import {PasswordService} from './password.service';
import { NgForm } from '@angular/forms';
/**
 * Generated class for the PasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
  providers:[PasswordService]
})
export class PasswordPage {
  user:any={}
  constructor(public navCtrl: NavController, 
  	          public navParams: NavParams,
  	          public restService:PasswordService,
              public loadingController: LoadingController,
              public alertCtrl: AlertController, 
              private toastCtrl: ToastController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordPage');
  }

  OnUpdatePassword(form:NgForm){
      let loading = this.loadingController.create({
                content: 'Updating...'
              });
      loading.present();
      setTimeout(() => {
       loading.dismiss();
                  {
                      let toast = this.toastCtrl.create({
                          message: 'Password Incorrect or Invalid, Try Again!',
                          duration: 3000,
                          position: 'bottom'
                      });

                      toast.onDidDismiss(() => {
                        console.log('Dismissed toast');
                      });

                      toast.present();
                  }
       }, 15000);
       this.restService.UpdatePassword(this.user).subscribe(res=>{
       loading.dismiss();
     	this.navCtrl.push("HomePage");
                  {
                      let toast = this.toastCtrl.create({
                          message: 'Password Updated Successful!',
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
