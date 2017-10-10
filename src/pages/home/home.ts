import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Newsservice } from '../../providers/newsservice';
import {DetailsPage} from '../details/details'
import {ListofnewsPage } from '../listofnews/listofnews';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[Newsservice]
})
export class HomePage {
  items: any;
  source: any;
  color:any;
  sort:any;
  test:any;
  header:any={};
  constructor(public navCtrl: NavController, private redditService:Newsservice) {
    this.getDefaults();
    this.header.backgroundColor=this.color;
  }
 

  nextPage(name){
   this.navCtrl.push(ListofnewsPage,{
     name: name
   })
  }

  viewItem(item) {
    this.navCtrl.push(DetailsPage, {
      item:item
    });
  }
    getDefaults() {
    if (localStorage.getItem('source') != null) {
      this.source = localStorage.getItem('source');
    } else {
      this.source = 'al-jazeera-english'; // category ni sa news nga source like bbc 
    }
    if (localStorage.getItem('color') != null) {
      this.color = localStorage.getItem('color');
    } else {
      this.color = "lightgreen";
    }
    if (localStorage.getItem('sort') != null) {
      this.sort = localStorage.getItem('sort');
    } else {
      this.sort = "top";
    }

  }
    changeSource() {
      console.log("home.ts:"+this.source,this.sort);
    this.getPosts(this.source,this.sort);
  }
}


