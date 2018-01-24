import { Component, ViewChild } from '@angular/core';
import { Nav, Platform , Events} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  loginStatus:any = false;
  rootPage: any;
  userRole:any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public events: Events,public statusBar: StatusBar, public splashScreen: SplashScreen) {
    events.subscribe('user:created', (user, time) => {
      // user and time are the same arguments passed in `events.publish(user, time)`;
      this.loginStatus = true;
      this.userRole = user.role
      console.log('Welcome', JSON.stringify(user), 'at', time);
    });
    this.initializeApp();
    if(localStorage.getItem('token')){
      this.loginStatus = true;
      this.rootPage = "HomePage"
    }else {
      this.rootPage = "LoginPage"
    }
    if(localStorage.getItem('role')){
      this.userRole = localStorage.getItem('role')
    }
    // used for an example of ngFor and navigation 
    this.pages = [
      { title: 'Home', component: "HomePage" },
      { title: 'List', component: "ListPage" },
      { title: 'Profile', component: "ProfilePage" },
      { title: 'Change Password', component: "PasswordPage" }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page);
  }
  openPostApprovalPage(){
    this.nav.setRoot("PostApprovalPage");
  }
  Logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('tokens');
    this.loginStatus = false;
    this.nav.setRoot("LoginPage");
  }
}
