import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListPage } from './list';
import { UserProfilePage } from '../user-profile/user-profile';
@NgModule({
  declarations: [
    ListPage,
    UserProfilePage
  ],
  imports: [
    IonicPageModule.forChild(ListPage),
  ],
  entryComponents:[
  UserProfilePage
  ]
})
export class ListPageModule {}
