import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Storage } from '@ionic/storage';
import * as _ from 'lodash';
import { UUID } from 'angular2-uuid';
import { Newsservice } from '../../providers/newsservice';
import { SocialSharing } from '@ionic-native/social-sharing';


@IonicPage()
@Component({
  selector: 'page-articlesdetail',
  templateUrl: 'articlesdetail.html',
  providers:[Newsservice]
})
export class ArticlesdetailPage {
  item:any;
  colors: string;
  alreadybooked:boolean = false;
  redundant: any;
  teUrl:any;
  teimage:any;
  favourites: Array < any > ;
  constructor(public navCtrl: NavController, public navParams: NavParams ,  private iab : InAppBrowser , public storage : Storage , public alertCtrl : AlertController , private socialSharing: SocialSharing) {
  	 this.item = this.navParams.get('data');
     this.colors = this.navParams.get('color');
     storage.get('bookmark').then((value) => {
             if (_.isEmpty(value)) {
                this.favourites = [];
            } else {
                this.favourites = value;
            }
            this.redundant = _.find(this.favourites, { title: this.item.title });
            if (!_.isUndefined(this.redundant)) {
                this.item._id = this.redundant._id;
                this.alreadybooked = true;
            }
        });
    }

   openArticle(url) {
     const browser =  this.iab.create(url, '_system','location=no');
      browser.show();
    }

     DeleteBookmarked(item) {
        console.log('item:', item);
        let vas = _.filter(this.favourites, (value) => {
            return value._id != item._id;
        });
        let confirm = this.alertCtrl.create({
            title: 'Bookmark',
            message: 'Remove bookmark?',
            buttons: [{
                text: 'No',
                handler: () => {
                    console.log('Disagree clicked');
                }
            }, {
                text: 'Yes',
                handler: () => {
                    this.storage.set('bookmark', vas);
                    this.redundant = {};
                    this.alreadybooked = false;
                }
            }]
        });
        confirm.present();
    }

    bookmark(item) {
        item.color = this.colors;
        item._id = UUID.UUID();
        this.favourites.push(item)
        this.favourites = _.uniqBy(this.favourites, 'title');  
        this.storage.set('bookmark', this.favourites);
        let alert = this.alertCtrl.create({
            title: 'News Was Bookmarked',
            buttons: ['Okay']
        });
        alert.present();
        this.alreadybooked = true;
    }


  
}
