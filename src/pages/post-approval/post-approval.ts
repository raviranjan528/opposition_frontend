

import { Component } from '@angular/core';
import {IonicPage, NavController, ToastController,NavParams, ViewController,ModalController,Platform, LoadingController, AlertController } from 'ionic-angular';
import { PostApprovalService } from './post-approval.service';

@IonicPage()
@Component({
  selector: 'page-post-approval',
  templateUrl: 'post-approval.html',
  providers: [PostApprovalService]
})
export class PostApprovalPage {
postData: any;
username: any;

  constructor(public navCtrl: NavController,
    public restService: PostApprovalService,
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
    this.restService.getPostData().subscribe(res => {
      console.log("this.postData :::" + JSON.stringify(res))
        this.postData = res;
    })
  }
  approvedPost(id){
  	this.restService.postPostData(id).subscribe(res =>{
  		this.OnGetMessage();
  	})

  }

}
