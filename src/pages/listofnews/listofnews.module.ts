import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListofnewsPage } from './listofnews';

@NgModule({
  declarations: [
    ListofnewsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListofnewsPage),
  ],
})
export class ListofnewsPageModule {}
