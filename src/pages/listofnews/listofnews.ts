import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Newsservice } from '../../providers/newsservice';
import * as _ from 'lodash';
import { Storage } from '@ionic/storage';
import { DetailsPage } from '../details/details';
import { ArticlesPage } from '../articles/articles';



@IonicPage()
@Component({
    selector: 'page-listofnews',
    templateUrl: 'listofnews.html',
    providers:[Newsservice]
})
export class ListofnewsPage {
    title: any;
    items:any;
    item:any;
    data: any;
    source:any;
    sort:any;
    name:any;
    colors: string;
    searchQuery: string = '';

    constructor(public navCtrl: NavController, public navParams: NavParams, private redditService: Newsservice) {
        this.name = this.navParams.get('name');
        this.items = this.navParams.get('data');
        this.colors = this.navParams.get('color');
        this.item = this.navParams.get('data');
        this.item=navParams.get('item');
        this.data = this.navParams.get('data');
        this.colors = this.navParams.get('color');
        /*this.initializeItems();
*/
    }
    /*initializeItems () {
        this.namess =[];
    }
*/
   	viewItem(item) {
    this.navCtrl.push(DetailsPage, {
      item:item
    });
   }

    getNewsDetails(param) {
        this.navCtrl.push(DetailsPage, {
            data: param,
            color: this.colors
        });
    }

    goToArticles(id) {
        this.navCtrl.push(ArticlesPage, {
            id: id,
            color:this.colors
        })
    }
 
    ionViewDidLoad() {
        console.log('ionViewDidLoad ListofnewsPage');
        this.redditService.getNews().then((resp: any) => {
            if (resp.status == 'ok') {
                let filter = _.filter(resp.sources, { 'category': this.name });
                this.data = filter;
                console.log("halooo",filter);
            }
        })

    }

}

