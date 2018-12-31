import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherComponent } from '../weather/weather.component';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';
  constructor(private router: Router) { }

  ngOnInit() {
  }

  search() {
    let query = this.searchTerm;
    if(query) {
      setTimeout(()=> {
        if(query == this.searchTerm) {
          console.log("searching: " + this.searchTerm);
          this.router.navigate(['weather', {searchTerm: this.searchTerm}]);
        } else {
          console.log("interupt");
        }
      }, 1000);   
    }
  }
}
