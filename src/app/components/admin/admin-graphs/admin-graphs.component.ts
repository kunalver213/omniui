import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-graphs',
  templateUrl: './admin-graphs.component.html',
  styleUrls: ['./admin-graphs.component.css']
})
export class AdminGraphsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.http.post('http://localhost:8080/get_admin_graphs_tran_by_aprov_decl', null).subscribe(
      (res:any) => {
        if(res.length>0){
          //
        }
      }
    );

    this.http.post('http://localhost:8080/get_admin_graphs_tran_type', null).subscribe(
      (res:any) => {
        if(res.length>0){
          //
        }
      }
    );

    this.http.post('http://localhost:8080/get_admin_graphs_resp_code', null).subscribe(
      (res:any) => {
        if(res.length>0){
          //
        }
      }
    );

    this.http.post('http://localhost:8080/get_admin_graphs_card_brand', null).subscribe(
      (res:any) => {
        if(res.length>0){
          //
        }
      }
    );

    this.http.post('http://localhost:8080/get_admin_graphs_tran_by_mode', null).subscribe(
      (res:any) => {
        if(res.length>0){
          //
        }
      }
    );

    this.http.post('http://localhost:8080/get_admin_graphs_tran_status', null).subscribe(
      (res:any) => {
        if(res.length>0){
          //
        }
      }
    );

  }

}
