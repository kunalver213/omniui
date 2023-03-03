import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Signup } from '../model/signup.model';

@Component({
  selector: 'app-transcation-history',
  templateUrl: './transcation-history.component.html',
  styleUrls: ['./transcation-history.component.css']
})
export class TranscationHistoryComponent implements OnInit {

  user: Signup = new Signup;

  tranHistory : any;
  tranHistoryTab : any;

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

    this.http.post('http://localhost:8080/tran_history_table', this.user).subscribe(
      (res:any) => {
        if(res.length>0){
          this.tranHistoryTab = res.data; 
        }
      }
    );

  }

}
