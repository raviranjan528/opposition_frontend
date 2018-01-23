import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePageModule } from '../pages/home/home.module';
import { ListPageModule } from '../pages/list/list.module';
import {LoginPageModule} from '../pages/login/login.module';
import {ProfilePageModule} from '../pages/profile/profile.module';
import {SignUpPageModule} from '../pages/sign-up/sign-up.module';
import {PasswordPageModule} from '../pages/password/password.module';
// import {CommentPageModule} from '../pages/comment/comment.module';
// import {RatingPageModule} from '../pages/rating/rating.module'
import {CommentPage} from '../pages/comment/comment';
import {RatingPage} from '../pages/rating/rating'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ConstService} from './constService';
// import { Ng2CloudinaryModule } from 'ng2-cloudinary';
// import { FileUploadModule } from 'ng2-file-upload';
@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    LoginPageModule,
    ProfilePageModule,
    SignUpPageModule,
    HomePageModule,
    ListPageModule,
    PasswordPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ConstService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
