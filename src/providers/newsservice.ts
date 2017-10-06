import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class Newsservice {
  http:any;
  key: string;
  data:any;
  constructor(http: Http) {
    this.http=http;
    console.log('Newsservice Provider');
    this.key = '0bc941e9ac52456581855b5edf9abd14';
  }

  getNews(){
    return new Promise(resolve => {
            this.http.get('https://newsapi.org/v1/sources?language=en&apiKey=' + this.key)
                .map(res => res.json())
                .subscribe(data => {
                    this.data = data;
                    resolve(this.data);
                });
        });
  }

  getPosts(source,sort){
        var sort_value=sort;

        if(source=="bbc-news" || source=="cnbc" || source=="cnn" || source=="the-new-york-times")
        {
          sort_value="top";
        }
        return this.http.get('https://newsapi.org/v1/articles?source='+source+'&sortBy='+sort_value+'&apiKey=' + this.key).
        map(res=>res.json());
    }
}
