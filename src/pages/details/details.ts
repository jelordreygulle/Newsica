import { Component, OnInit } from '@angular/core';
import { NavController,NavParams, AlertController , Platform } from 'ionic-angular';
import { Newsservice } from '../../providers/newsservice';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Storage } from '@ionic/storage';
import * as _ from 'lodash';
import { UUID } from 'angular2-uuid';
import { SocialSharing } from '@ionic-native/social-sharing';


@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
  providers:[Newsservice]
})
export class DetailsPage {

  header:any={};
  color:any;
  item:any;
  colors: string;
  name :any;
  redundant : any;
  favourites: Array < any > ;
  Loading: any;
  alreadybooked:boolean =false;
   public sendTo   : any; 
   public subject  : string = 'Message from Social Sharing App';
   public message  : string = 'Take your app development skills to the next level with Mastering Ionic - the definitive guide';
   public image    : string  = 'http://masteringionic2.com/perch/resources/mastering-ionic-2-cover-1-w320.png';
   public uri      : string  = 'http://masteringionic2.com/products/product-detail/s/mastering-ionic-2-e-book';

   constructor(public navCtrl: NavController,public params:NavParams, private redditService:Newsservice , private iab : InAppBrowser ,  public storage : Storage , public alertCtrl : AlertController , public platform: Platform) {
    this.item=this.params.get('item');
    this.color = localStorage.getItem('color');
    this.name = params.get('name');
    this.header.backgroundColor=this.color;
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

    /*regularShare(index) {

      var msg = this.compilemsg(index);
      this.socialSharing.share(msg, null, null, null);

    }

    compilemsg(index):string{
    var msg = this.quotes[index].content + "-" + this.quotes[index].title ;
    return msg.concat(" \n Sent from my Awesome App !");
   }*/

    openNews(url) {
      const browser =  this.iab.create(url, '_self','location=yes');
      browser.show();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DetailsPage');
    }
   



    /*ionViewDidLoad() {
        console.log('ionViewDidLoad DetailsPage');
        this.redditService.getNews().then((resp: any) => {
            if (resp.status == 'ok') {
                let filter = _.filter(resp.sources, { 'category': this.name });
                this.data = filter;
                console.log("halooo",filter);
            }
        })

    }*/
   /*shareViaInstagram() {
      this.platform.ready()
      .then(() => 
      {
    
         SocialSharing.share(this.message, this.image)
         .then((data) =>
         {  
            console.log('Shared via shareViaInstagram');
         })
         .catch((err) =>
         {
            console.log('Was not shared via Instagram');
         });

      });
   }*/


    readMore(url) {  
         new InAppBrowser(url, '_blank', 'location=yes');
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



