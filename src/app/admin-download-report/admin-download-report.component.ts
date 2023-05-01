import { Component, OnInit } from '@angular/core';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-download-report',
  templateUrl: './admin-download-report.component.html',
  styleUrls: ['./admin-download-report.component.css']
})
export class AdminDownloadReportComponent implements OnInit {

  model: NgbDateStruct | undefined;

  faCalendarDay = faCalendarDay;

  constructor(private calendar: NgbCalendar, private http: HttpClient) { }

  ngOnInit(): void {
    this.model = this.calendar.getToday();
  }

}
