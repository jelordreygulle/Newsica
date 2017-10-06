import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class About {
  header:any={};
  color:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.color = localStorage.getItem('color');
    this.header.backgroundColor=this.color;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad About');
  }

}
