import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';

@Component({
  selector: 'app-terminal-detail',
  templateUrl: './terminal-detail.component.html',
  styleUrls: ['./terminal-detail.component.css']
})
export class TerminalDetailComponent implements OnInit {

  user: User = new User;

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
    this.postList();
  }

  postList(){
    this.http.post('http://localhost:8080/get_terminal_detail', this.user).subscribe(
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
    .filter((t: { Model: any; })=> t.Model.includes(this.searchText));
  }

}
