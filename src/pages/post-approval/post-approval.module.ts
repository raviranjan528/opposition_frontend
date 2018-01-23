import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostApprovalPage } from './post-approval';

@NgModule({
  declarations: [
    PostApprovalPage,
  ],
  imports: [
    IonicPageModule.forChild(PostApprovalPage),
  ],
})
export class PostApprovalPageModule {}
