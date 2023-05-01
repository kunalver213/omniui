import { Component, OnInit } from '@angular/core';
import { faCalendarDay, faSearch, faDownload } from '@fortawesome/free-solid-svg-icons';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-tran-detail',
  templateUrl: './admin-tran-detail.component.html',
  styleUrls: ['./admin-tran-detail.component.css']
})
export class AdminTranDetailComponent implements OnInit {

  modeldp1: NgbDateStruct | undefined;
  modeldp2: NgbDateStruct | undefined;

  faCalendarDay = faCalendarDay;
  faSearch = faSearch;
  faDownload = faDownload;


  constructor() { }

  ngOnInit(): void {
  }

}
