import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RestApiService } from '../rest-api.service';
import { SearchComponent } from '../search/search.component';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  searchTerm: string;
  data: any;
  sunrise;
  sunset;
  times = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24];
  link: string = "http://api.apixu.com/v1/forecast.json?key=";
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => {
      console.log('ngOnInit');
      this.searchTerm = res['searchTerm'];
      console.log(this.searchTerm);
      this.getWeather();
    });
  }

  getSunValues() {
    let strSunrise = this.data.forecast.forecastday[0].astro.sunrise;
    let strSunset = this.data.forecast.forecastday[0].astro.sunset;
    
    if(this.data) {
      if(strSunrise.substring(strSunrise.length-2, strSunrise.length) === 'PM') {
        const hours = (parseInt((strSunrise.split(':')[0])) +12) * 60;
        strSunrise = hours + parseInt(strSunrise.split(':')[1].substring(strSunrise.split(':').length-2, strSunrise.split(':').length));
      } else {
        const hours = parseInt(strSunrise.split(':')[0]) * 60;
        strSunrise = hours + parseInt(strSunrise.split(':')[1].substring(strSunrise.split(':').length-2, strSunrise.split(':').length));
      }
      if(strSunset.substring(strSunset.length-2, strSunset.length) === 'PM') {
        const hours = (parseInt((strSunset.split(':')[0])) +12) * 60;
        strSunset = hours + parseInt(strSunset.split(':')[1].substring(strSunset.split(':').length-2, strSunset.split(':').length));
      } else {
        strSunset = strSunset.split(':')[0] + strSunset.split(':')[1].substring(strSunset.split(':').length-2, strSunset.split(':').length); 
      }
    }
    this.sunset = (strSunset/1440)*100;
    this.sunrise = (strSunrise/1440)*100;
    console.log(this.sunrise);
    console.log(this.sunset);
  }

  async getWeather() {
    try {
      console.log("getting weather");
      const response = await this.http.get(this.link + environment.api_key + '&q=' + this.searchTerm + '&days=1', { observe: 'response' })
      .subscribe(resp => {
        if (resp.status == 200) {
          this.data = resp.body;
          this.getSunValues();
          console.log("status code ok");
        } else {
          console.log('status not ok');
        }
      }, err => {
        this.data = null;
      });
    } catch (error) {
      this.data = '';
    }
  }
}
