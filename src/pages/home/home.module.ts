import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { MomentModule } from 'angular2-moment';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';
import { CommentPage } from '../comment/comment';
import { RatingPage } from '../rating/rating';
import { PostPage } from '../post/post';
@NgModule({
  declarations: [
     HomePage,
     CommentPage,
     RatingPage,
     PostPage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    MomentModule,
    Ng2CloudinaryModule,
    FileUploadModule
  ],
  entryComponents:[
  CommentPage,
  RatingPage,
  PostPage
  ]
})
export class HomePageModule {}
