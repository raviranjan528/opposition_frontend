import { Component } from '@angular/core';
import {IonicPage, NavController, ToastController,NavParams, ViewController,ModalController,Platform, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { UserListService } from './list.service';
import { UserProfilePage } from '../user-profile/user-profile';
@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers:[UserListService]
})
export class ListPage {
  userList:any[]=[]
  userData:any = {}
  followData: any[] = []
  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public userlistService:UserListService, public navParams: NavParams) {
    this.OnGetUserlist()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }


  OnGetUserlist(){
    this.userlistService.getProfileData().subscribe(res => {
      console.log("this.userdata :::" + JSON.stringify(res))
        this.userData = res;
        this.followData = res.followers
    })
    this.userlistService.getUserListData().subscribe(res => {
      console.log("this.postData :::" + JSON.stringify(res))
        this.userList = res;
    })
  }

  followUser(id){
    this.userlistService.followUser(id).subscribe(res => {
      console.log("this.postData :::" + JSON.stringify(res))
        this.OnGetUserlist();
    })
  }

  unfollowUser(id){
    this.userlistService.unfollowUser(id).subscribe(res => {
      console.log("this.postData :::" + JSON.stringify(res))
      this.OnGetUserlist();
    })
  }



   userprofilePage(userId) {
     console.log('hello')
   let profileModal = this.modalCtrl.create(UserProfilePage, { userId: userId });
   profileModal.onDidDismiss(data => {
      
    })
   profileModal.present();
 }

  checkfunction(id){
    console.log('id' + id)

      let index = this.followData.findIndex((x) =>  x == id)
      console.log(index + '-----position----');
      if(index  >= 0){
        return true;
      }else{
        return false;
    }
  
  }
}
