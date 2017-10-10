import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Newsservice } from '../../providers/newsservice';
import { ArticlesdetailPage } from '../articlesdetail/articlesdetail';
/**
 * Generated class for the ArticlesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-articles',
  templateUrl: 'articles.html',
  providers:[Newsservice]
})
export class ArticlesPage {
  sources: Array < any > ;
  news_id: string;
  data: Array < any > ;
  colors: string;
  name:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public redditService: Newsservice) {
  this.news_id = this.navParams.get('id');
  this.colors = this.navParams.get('color');
  this.name = this.navParams.get('name');
  
  }	

    ionViewDidLoad() {
        console.log('ionViewDidLoad ArticlesPage');
        this.redditService.loadArticles(this.news_id).then((resp: any) => {
            if (resp.status == 'ok') {
                _.each(resp.articles, (row) => {
                    row.publishedAt = moment(row.publishedAt).format("MMMM Do YYYY | h:mm A");
                })
                this.sources = resp.articles;
            }
        })
    }

    getArticleDetails(param) {
        this.navCtrl.push(ArticlesdetailPage, {
            data: param,
            color: this.colors
        });
    }
}
