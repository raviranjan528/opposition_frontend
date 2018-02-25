import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams, ViewController, ModalController, Platform, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { HomeService } from './home.service';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { CommentPage } from '../comment/comment';
import { RatingPage } from '../rating/rating';
import { PostPage } from '../post/post';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HomeService]
})
export class HomePage implements OnInit {
  postData: any;
  username: any;
  search: any;
  url1: any;
  imageAvilable: any = 0;
  autocompleteItems: any;
  autocomplete: any;
  acService: any;
  placesService: any;
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
  ngOnInit() {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }

  OnGetMessage() {
    this.homeService.getPostData().subscribe(res => {
      console.log("this.postData :::" + JSON.stringify(res))
      this.postData = res;
    })
  }

  ratingPage(postId) {
    let profileModal = this.modalCtrl.create(RatingPage, { postId: postId });
    profileModal.onDidDismiss(data => {
      this.OnGetMessage();
    })
    profileModal.present();
  }

  commentPage(postId) {
    let profileModal = this.modalCtrl.create(CommentPage, { postId: postId });
    profileModal.onDidDismiss(data => {
      console.log(data);
      this.OnGetMessage();

    })
    profileModal.present();
  }


  postPage() {
    let postModal = this.modalCtrl.create(PostPage);
    postModal.onDidDismiss(data => {
      console.log(data);
      this.OnGetMessage();

    })
    postModal.present();
  }


  // onSearch(event){
  //   if(event.length > 0){
  //     const data= {title:event}
  //     this.homeService.searchPostData(data).subscribe(res => {
  //       console.log("this.postData :::" + JSON.stringify(res))
  //       this.postData = res;
  //       if(res.length > 0){
  //         this.postData = res;
  //       }
  //       else{
  //         this.OnGetMessage()
  //       }
  //     })
  //   }
  // }

  onInput(event) {
    console.log('helllo' + event.target.value)
    if (event.target.value.length > 0) {
      const data = { title: event.target.value }
      this.homeService.searchPostData(data).subscribe(res => {
        console.log("this.postData :::" + JSON.stringify(res))
        this.postData = res;
        if (res.length > 0) {
          this.postData = res;
        }
        else {

        }
      })
    } else {
      this.OnGetMessage()
    }
  }
  onCancel(event) {
    console.log('cancel' + event)
  }

  updateSearch(event) {
    console.log('helllo' + JSON.stringify(event))
    if (event.target.value == undefined) {
      this.OnGetMessage();
      this.autocompleteItems = [];
    } else {
      if (event.target.value.length > 0) {
        const data = { title: event.target.value }
        console.log('modal > updateSearch');
        if (this.autocomplete.query == '') {
          this.autocompleteItems = [];
          return;
        }
        let self = this;
        let config = {
          //types:  ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
          input: this.autocomplete.query,
          componentRestrictions: {}
        }
        this.homeService.searchPostData(data).subscribe(res => {
          console.log('modal > getPlacePredictions > status > ', res);
          if (res.length > 0) {
            self.autocompleteItems = [];
            res.forEach(function (prediction) {
              self.autocompleteItems.push(prediction);
            });
          }

        });
      }
    }

  }

  chooseItem(event) {
    console.log('event' + JSON.stringify(event))
    this.users.address = event;
    this.autocomplete.query = event.title;
    this.postData = [];
    this.postData.push(event)
  }

}

