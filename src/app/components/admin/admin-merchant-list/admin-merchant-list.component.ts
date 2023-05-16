import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-merchant-list',
  templateUrl: './admin-merchant-list.component.html',
  styleUrls: ['./admin-merchant-list.component.css']
})
export class AdminMerchantListComponent implements OnInit {
  
  loader : boolean = true;

  displayStyle = "none";

  page: number = 1;
  count: number = 0;
  tableSize: number = 10;

  merchantList : any;
  merchantListTab : any;
  merchantListTabAll : any;
  
  transPop : any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.postList();
  }

  postList(){
    this.http.post('http://localhost:8080/get_admin_merchant_list', null).subscribe(
      (res:any) => {
        if(res.length>0){
          this.merchantListTabAll = res.data; 
          this.merchantListTab = this.merchantListTabAll;
          this.loader = false; 
        }
      }
    );
  }

  onTableDataChange(event:any){
    this.page = event;
    this.postList();
  }

  openPopup(tran:any) {
    console.log(tran);
    this.transPop = tran;
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

}
