import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-merchant-list',
  templateUrl: './admin-merchant-list.component.html',
  styleUrls: ['./admin-merchant-list.component.css']
})
export class AdminMerchantListComponent implements OnInit {
  
  displayStyle = "none";

  constructor() { }

  ngOnInit(): void {
  }

  openPopup(tran:any) {
    console.log(tran);
    // this.transPop = tran;
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

}
