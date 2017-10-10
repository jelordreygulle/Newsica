import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { About } from '../pages/about/about';
import { ListofnewsPage } from '../pages/listofnews/listofnews';
import { ArticlesPage } from '../pages/articles/articles';
import { ArticlesdetailPage } from '../pages/articlesdetail/articlesdetail';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DetailsPage } from '../pages/details/details';
import { HttpModule } from '@angular/http';
import { SocialSharing } from '@ionic-native/social-sharing';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Storage } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    About,
    ListofnewsPage,
    ArticlesPage,
    ArticlesdetailPage,
    DetailsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    About,
    ArticlesdetailPage,
    ArticlesPage,
    ListofnewsPage,
    DetailsPage

  ],
  providers: [
    StatusBar,
    InAppBrowser,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler} , Storage , SocialSharing
  ]
})
export class AppModule {}
