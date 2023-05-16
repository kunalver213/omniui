import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-topten',
  templateUrl: './admin-topten.component.html',
  styleUrls: ['./admin-topten.component.css']
})
export class AdminToptenComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  tableSize: number = 10;

  tranHistory : any;
  tranHistoryTab : any;
  tranHistoryTabAll : any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.postList();
  }

  postList(){
    this.http.post('http://localhost:8080/get_admin_top_ten_declined', null).subscribe(
      (res:any) => {
        if(res.length>0){
          this.tranHistoryTabAll = res.data; 
          this.tranHistoryTab = this.tranHistoryTabAll;
        }
      }
    );
  }

  onTableDataChange(event:any){
    this.page = event;
    this.postList();
  }

}
