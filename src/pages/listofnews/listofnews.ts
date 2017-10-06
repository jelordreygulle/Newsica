import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Newsservice } from '../../providers/newsservice';
import * as _ from 'lodash';
import { Storage } from '@ionic/storage';
import { DetailsPage } from '../details/details';


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
        this.initializeItems();

    }
    initializeItems () {
        this.namess =[];
    }

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

    getItems(ev) {
    this.initializeItems();
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.name = this.name.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
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

