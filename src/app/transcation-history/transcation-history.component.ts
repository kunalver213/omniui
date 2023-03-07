import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Signup } from '../model/signup.model';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'app-transcation-history',
  templateUrl: './transcation-history.component.html',
  styleUrls: ['./transcation-history.component.css']
})
export class TranscationHistoryComponent implements OnInit {

  user: Signup = new Signup;
  faCheck = faCheck;
  faPlus = faPlus;
  faExclamationTriangle = faExclamationTriangle;

  tranHistory : any;
  tranHistoryTab : any;
  tranHistoryTabAll : any;

  page: number = 1;
  count: number = 0;
  tableSize: number = 10;

  searchText:string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void { 

    this.user.merchantId = 'ClaroBP';

    this.http.post('http://localhost:8080/tran_history', this.user).subscribe(
      (res:any) => {
        if(res.length>0){
          this.tranHistory = res.data[0]; 
        }
      }
    );

    this.postList();

  }

  postList(){
    this.http.post('http://localhost:8080/tran_history_table', this.user).subscribe(
      (res:any) => {
        if(res.length>0){
          this.tranHistoryTabAll = res.data; 
          this.tranHistoryTab = this.tranHistoryTabAll;
          if(this.searchText.length>0){
            this.filterData();
          }
        }
      }
    );
  }

  onTableDataChange(event:any){
    this.page = event;
    this.postList();
  }

  filterData(){
    this.tranHistoryTab = this.tranHistoryTabAll
    .filter((t: { RetrivalReferance: any; })=> t.RetrivalReferance.includes(this.searchText));
  }

  downloadCsv(){
    var options = { 
      headers: ["DATE", "TIME", "CARD TYPE", "TRANSACTION TYPE", "RETRIEVAL REF", "AMOUNT", "STATUS"]
    }
    new ngxCsv(this.tranHistoryTab, 'My Report', options);

  }

}
