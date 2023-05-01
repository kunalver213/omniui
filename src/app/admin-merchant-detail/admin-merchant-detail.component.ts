import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-merchant-detail',
  templateUrl: './admin-merchant-detail.component.html',
  styleUrls: ['./admin-merchant-detail.component.css']
})
export class AdminMerchantDetailComponent implements OnInit {

  loader : boolean = true;

  faSearch = faSearch;

  constructor() { }

  ngOnInit(): void {
    this.loader = false;    
  }

}
