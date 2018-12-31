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
  link: string = "http://api.apixu.com/v1/current.json?key=";
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => {
      console.log('ngOnInit');
      this.searchTerm = res['searchTerm'];
      console.log(this.searchTerm);
      this.getWeather();
    });
  }

  getWeather() {
    console.log("getting weather");
    const response = this.http.get(this.link + environment.api_key + '&q=' + this.searchTerm).toPromise();
    response['error'] ? console.log('error') : this.data = response;
    // this.data = null;
    // console.log('getting weather');
    // try {
    //   const result = await this.rest.get(this.link + environment.api_key + '&q=' + this.searchTerm);
    //   result['error'] ? this.data = "error" : this.data = result;
    //   console.log(this.data);
    // } catch(error) {
    //   console.log(error);
    // }
  }
}