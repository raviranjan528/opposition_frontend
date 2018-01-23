
import {Component} from '@angular/core';
import {NavController,ModalController, Events, Platform, LoadingController, AlertController,IonicPage,ToastController,ViewController,} from 'ionic-angular';
import {CordovaOauth, Facebook, Google} from "ng2-cordova-oauth/core";
import {NgForm} from '@angular/forms';
import {SignupService} from './sign-up.service';
// declare var facebookConnectPlugin: any;


@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
   providers:[SignupService]
})
export class SignUpPage {

  signin() {

this.navCtrl.push("LoginPage");
   }

private cordovaOauth: CordovaOauth = new CordovaOauth();
    private facebookProvider: Facebook = new Facebook({
        clientId: "119446875394630",
        appScope: ["email"]
    })
    private googleProvider: Google = new Google({
        clientId: "816938820793-35uq29jt5lip2fcff5mlodeenb6oaan3.apps.googleusercontent.com",
        appScope: ["email"]
    })

    constructor(public navCtrl: NavController,
                public modalCtrl:ModalController,
                public signupService: SignupService,
                private platform: Platform,
                public loadingController: LoadingController,
                public alertCtrl: AlertController,
                private toastCtrl: ToastController,
                public viewCtrl: ViewController,
                public events: Events
            ) {
    }

    users = {
        name: "",
        email: "",
        password: ""
    }

    ionViewDidLoad() {
        console.log('Hello Signup Page is here');
    }

    OnRegister(form: NgForm) {
        if (this.users.email != "" && this.users.password != "") {
            let loading = this.loadingController.create({
                content: 'Signing Up, Please Wait...'
            });
            loading.present();
            this.signupService.loginData(this.users)
                .subscribe((response) => {
                        localStorage.setItem('token', "bearer " + response.token);
                        localStorage.setItem('tokens', response.token);
                          this.navCtrl.push("ProfilePage");
                        this.events.publish('user:created', this.users, Date.now());
                      
                        {
                              let toast = this.toastCtrl.create({
                                  message: 'Sign Up Successful!',
                                  duration: 3000,
                                  position: 'bottom'
                              });

                              toast.onDidDismiss(() => {
                                console.log('Dismissed toast');
                              });

                              toast.present();
                        }
                        loading.dismiss();
                    },
                    (error) => {
                        loading.dismiss();
                        let alert = this.alertCtrl.create({
                            title: 'Sign Up Failed',
                            subTitle: 'User Already Exists, Sign In!',
                            buttons: ['OK']
                        });
                        alert.present();
                    }
                );
        }
        else {
            let alert = this.alertCtrl.create({
                title: 'Sign In Failed',
                subTitle: 'Please Fill Valid User Details',
                buttons: ['OK']
            });
            alert.present();
        }
    }

    //FaceBook

    OnFacebook() {
        this.cordovaOauth = new CordovaOauth();
        this.platform.ready().then(() => {
            this.cordovaOauth.logInVia(this.facebookProvider).then(success => {
                console.log("RESULT: " + JSON.stringify(success));
                let loading = this.loadingController.create({
                    content: 'Login Please Wait...'
                });
                loading.present();
                this.signupService.facebooklogin(success).subscribe((response) => {
                        console.log("suceesss response" + JSON.stringify(response));

                        this.signupService.setFacebookeData(response).subscribe((result) => {
                            console.log("suceesss response after data save for Facebook" + JSON.stringify(result));
                            localStorage.setItem('token', "bearer " + result.token);
                            localStorage.setItem('tokens', result.token);
                            this.navCtrl.push("ProfilePage");
                            this.events.publish('user:created', this.users, Date.now());
                            loading.dismiss();
                        })
                    },
                    (error) => {
                        console.log(JSON.stringify(error));
                    }
                )
            }, error => {
                console.log("ERROR is a: ", JSON.stringify(error));
            });
        });
    }

    //Google
    OnGoogle() {
        this.cordovaOauth = new CordovaOauth();
        this.platform.ready().then(() => {
            this.cordovaOauth.logInVia(this.googleProvider).then(success => {
                console.log("RESULT: " + JSON.stringify(success));
                let loading = this.loadingController.create({
                    content: 'Login Please Wait...'
                });
                loading.present();
                this.signupService.googlelogin(success).subscribe((response) => {
                        console.log("suceesss response" + JSON.stringify(response))
                        this.signupService.setGoogleData(response).subscribe((result) => {
                            console.log("suceesss response after data save for google" + JSON.stringify(result));
                            localStorage.setItem('token', "bearer " + result.token);
                            localStorage.setItem('tokens', result.token);
                            this.navCtrl.push("ProfilePage");
                            loading.dismiss();
                        })
                    },
                    (error) => {
                        console.log(JSON.stringify(error));
                    }
                )

            }, error => {
                console.log("ERROR is a: ", JSON.stringify(error));
            });
        });
    }



}

