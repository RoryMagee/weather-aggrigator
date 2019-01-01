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

  async getWeather() {
    try {
      console.log("getting weather");
      const response = await this.http.get(this.link + environment.api_key + '&q=' + this.searchTerm + '&days=3', { observe: 'response' })
      .subscribe(resp => {
        if (resp.status == 200) {
          this.data = resp.body;
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