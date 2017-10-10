import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticlesdetailPage } from './articlesdetail';

@NgModule({
  declarations: [
    ArticlesdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ArticlesdetailPage),
  ],
})
export class ArticlesdetailPageModule {}
