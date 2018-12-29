import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';
  current: any;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  // stoppedTyping() {
  //   clearTimeout(this.current);
  //   this.current = setTimeout(this.search, 1000);
  // }

  search() {
    let query = this.searchTerm;
    if(query) {
      setTimeout(()=> {
        if(query == this.searchTerm) {
          console.log("searching");
          this.router.navigate(['weather', {searchTerm: this.searchTerm}]);
        } else {
          console.log("interupt");
        }
      }, 1000);   
    }
  }
}
