import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
  constructor(private router: Router, private activatedRouter: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe(res => {
      this.searchTerm = res['searchTerm'];
      console.log(this.searchTerm);
      this.data = this.search(this.searchTerm);
      
    });
  }

  search(searchTerm: string) {
    return this.http.get(this.link + environment.api_key + searchTerm).toPromise();
  }



}
