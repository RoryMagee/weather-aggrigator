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
  constructor(private router: Router, private activatedRouter: ActivatedRoute, private rest: RestApiService) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe(res => {
      this.searchTerm = res['searchTerm'];
      console.log(this.searchTerm);
      this.getWeather();
    });
  }

  async getWeather() {
    try {
      this.data = await this.rest.get(this.link + environment.api_key + '&q=' + this.searchTerm);
    } catch(error) {
      console.log(error);
    }
  }


}
