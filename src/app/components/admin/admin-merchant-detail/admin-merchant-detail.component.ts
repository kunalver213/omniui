import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Merchant } from '../../../model/merchant.model';

@Component({
  selector: 'app-admin-merchant-detail',
  templateUrl: './admin-merchant-detail.component.html',
  styleUrls: ['./admin-merchant-detail.component.css']
})
export class AdminMerchantDetailComponent implements OnInit {

  loader : boolean = false;

  faSearch = faSearch;

  req : any = new Object();
  
  merchant: Merchant = new Merchant;

  searchTxt : string = ''; 

  updateBtn : boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.getMerchant();
  }

  getMerchant(){    
    if(this.searchTxt.trim() == ''){ return; }

    this.loader = true;
    this.updateBtn = false;
    this.req.retailerId = this.searchTxt;
    this.merchant = new Merchant;
    this.http.post('http://localhost:8080/get_admin_merchant_detail', this.req).subscribe(
      (res:any) => {
        if(res.length>0){
          this.merchant = res.data[0];
          this.merchant.identificationDocType = this.getIdentificationDocType();
          this.updateBtn = true;
        }
        this.loader = false;
      }
    );
  }

  getIdentificationDocType(){
    if(this.merchant.identificationDocType == '0') { return 'Certificate of Citizenship' } else 
    if(this.merchant.identificationDocType == '1') { return 'Aliens Card' } else 
    if(this.merchant.identificationDocType == '2') { return 'Legal NIT' } else 
    if(this.merchant.identificationDocType == '3') { return 'Natural person NIT' } else 
    if(this.merchant.identificationDocType == '4') { return 'Unique identification number individual' } else 
    if(this.merchant.identificationDocType == '5') { return 'Passport' } else 
    if(this.merchant.identificationDocType == '6') { return 'Identity card' }
    return '';
  }

  updateMerchant(){
    this.loader = true;
    this.http.post('http://localhost:8080/update_admin_merchant_detail', this.merchant).subscribe(
      (res:any) => {
        if(res.data.affectedRows==1){
        }else{
        }        
        this.loader = false;
      }      
    );
  }

}
