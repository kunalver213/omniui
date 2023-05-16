import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user.model';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { ApiConstants } from 'src/app/config/apiConstants';
import { ApiHttpService } from 'src/app/services/api-http/api-http.service';

@Component({
  selector: 'app-transcation-history',
  templateUrl: './transcation-history.component.html',
  styleUrls: ['./transcation-history.component.css']
})
export class TranscationHistoryComponent implements OnInit {

  user: User = new User;
  faCheck = faCheck;
  faPlus = faPlus;
  faExclamationTriangle = faExclamationTriangle;
  
  loader : boolean = false;

  tranHistory : any;
  tranHistoryTab : any;
  tranHistoryTabAll : any;

  page: number = 1;
  count: number = 0;
  tableSize: number = 10;

  lastDays : number = 1;

  searchText:string = '';

  req : any = new Object();

  constructor(private apiConstants: ApiConstants,
    private apiHttpService: ApiHttpService) { }

  ngOnInit(): void { 
    this.getLastDaysData(1);
  }

  getLastDaysData(dVal : number){
    this.lastDays = dVal;
    this.req.lastDays = dVal;
    this.loader = true;
    this.transData();
  }

  transData(){
    this.apiHttpService.post(this.apiConstants.TRAN_HISTORY, this.req).subscribe(
      (res:any) => {
        if(res.length>0){
          this.tranHistory = res.data[0]; 
          this.postList();
        }
      }
    );
  }

  postList(){
    this.apiHttpService.post(this.apiConstants.TRAN_HISTORY_TABLE, this.req).subscribe(
      (res:any) => {
        if(res.length>0){
          this.tranHistoryTabAll = res.data; 
          this.tranHistoryTab = this.tranHistoryTabAll;
          if(this.searchText.length>0){
            this.filterData();
          }
        }
        this.loader = false; 
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
