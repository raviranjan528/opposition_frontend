
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController , Events} from 'ionic-angular';
import { ViewController,ModalController,Platform, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { CordovaOauth, Facebook, Google} from "ng2-cordova-oauth/core";
import { LoginService } from './login.service';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[LoginService]
})
export class LoginPage {

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }



   closemodal() {
    this.viewCtrl.dismiss();
  }




  signup(){
  //   this.viewCtrl.dismiss();
  //  let myModal = this.modalCtrl.create(SignupPage);
  //   myModal.present();
  this.navCtrl.push("SignUpPage");
  }








  forgetpassword() {
    let prompt = this.alertCtrl.create({
      title: 'Reset Password',
      message: "Please enter your Email to reset your Password.",
      inputs: [
        {
          name: 'Email',
          type: 'email',
          placeholder: 'abc@abc.com',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'DONE',
          handler: data => {
            console.log(data);
            this.confirmforgetpassword();
          }
        }
      ]
    });
    prompt.present();

  };





  confirmforgetpassword() {
    let alert = this.alertCtrl.create({
      title: 'Email Sent!',
      subTitle: 'Your New Password has been sent to your Mail,Please Check and Login!',
      buttons: ['OK']
    });
    alert.present();
  }



  dashboard(){
    this.navCtrl.push("DashboardPage");
  }



  dashboardtab(){
    this.navCtrl.push("DashboardtabPage");
  }


  //con
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
              public signinService: LoginService,
              private platform: Platform,
              public loadingController: LoadingController,
              public alertCtrl: AlertController, 
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public modalCtrl: ModalController,
              private toastCtrl: ToastController,
              public events: Events
            ) {}

   users={
    email:"",
    password:""
  }



      OnLogin(form: NgForm){
        if(this.users.email != "" && this.users.password != "") {
            let loading = this.loadingController.create({
                content: 'Signing In, Please Wait...'
              });
               loading.present();
                this.signinService.loginData(this.users)
               .subscribe( (response) => { 
                  localStorage.setItem('token', "bearer "+ response.token);
                  localStorage.setItem('tokens',  response.token);
                  if(localStorage.getItem('notifyId') != null){
                    var data = {signalId:localStorage.getItem('notifyId')}
                    this.signinService.upDateUserOneSignalID(data).subscribe(res=>{

                    })
                  }
                  this.signinService.getProfileData().subscribe(res =>{
                    console.log('res' + JSON.stringify(res))
                          this.navCtrl.push("HomePage");
                          localStorage.setItem('role',  res.role);
                  this.events.publish('user:created', res, Date.now());
                   {
                      let toast = this.toastCtrl.create({
                          message: 'Login Successful!',
                          duration: 3000,
                          position: 'bottom'
                      });

                      toast.onDidDismiss(() => {
                        console.log('Dismissed toast');
                      });

                      toast.present();
                  }
                  loading.dismiss();

                  })
            
            },
                 (error) => { 
                   loading.dismiss();
                          let alert = this.alertCtrl.create({
                              title: 'Sign In Failed',
                              subTitle: 'Invalid Email or Password!',
                              buttons: ['OK']
                            });
                            alert.present();
                        }
          );
      
        }
        else{
          // code...
           let alert = this.alertCtrl.create({
              title: 'Sign In Failed',
              subTitle: 'Please Fill Valid User Details',
              buttons: ['OK']
            });
            alert.present();
   }
 }

   forgetPassword(){
     this.navCtrl.push("ForgetPasswordPage");
   }

   noAccount="Don't have an account?";

      //FaceBook

    OnFacebook(){
      console.log('facebook login')
        this.cordovaOauth = new CordovaOauth();
        this.platform.ready().then(() => {
            this.cordovaOauth.logInVia(this.facebookProvider).then(success => {
                        let loading = this.loadingController.create({
                            content: 'Login Please Wait...'
                          });
                          loading.present();
                this.signinService.facebooklogin(success).subscribe((response)=>{
                  
       
                   this.signinService.setFacebookeData(response).subscribe((result)=>{
                     console.log(JSON.stringify(result) + 'result in face')
                       localStorage.setItem('token', "bearer "+ result.token);
                       localStorage.setItem('tokens',  result.token);
                       this.navCtrl.push("HomePage");
                       this.events.publish('user:created', this.users, Date.now());
                       loading.dismiss();
                     })
                },
                (error) => { 
                        }
                )
            }, error => {
            });
        });
    }

   //Google
    OnGoogle(){
        this.cordovaOauth = new CordovaOauth();
        this.platform.ready().then(() => {
            this.cordovaOauth.logInVia(this.googleProvider).then(success => {
                        let loading = this.loadingController.create({
                        content: 'Login Please Wait...'
                      });
                          loading.present();
                this.signinService.googlelogin(success).subscribe((response)=>{
                     this.signinService.setGoogleData(response).subscribe((result)=>{
                       localStorage.setItem('token', "bearer "+ result.token);
                       localStorage.setItem('tokens',  result.token);
                         this.navCtrl.push("HomePage");
                         loading.dismiss();
                     })
                },
                (error) => { 
                        }
                )
   
            }, error => {
            });
          });
    // this.navCtrl.push(SetProfilePage);
   }
}