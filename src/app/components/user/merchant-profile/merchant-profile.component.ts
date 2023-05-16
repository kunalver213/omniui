import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Merchant } from '../../../model/merchant.model';
import { User } from '../../../model/user.model';

@Component({
  selector: 'app-merchant-profile',
  templateUrl: './merchant-profile.component.html',
  styleUrls: ['./merchant-profile.component.css']
})
export class MerchantProfileComponent implements OnInit {
  
  loader : boolean = true;
  
  merchant: Merchant = new Merchant;
  user: User = new User;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getMerchant();
  }

  getMerchant(){
    
    this.user.merchantId = 'ClaroBP';
 
    this.http.post('http://localhost:8080/get_merchant_detail', this.user).subscribe(
      (res:any) => {
        if(res.length>0){
          this.merchant = res.data[0];
          this.merchant.identificationDocType = this.getIdentificationDocType();
          this.loader = false;
        }
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

  // updateTerminal(){
  //   // console.log(this.user);
  //   // this.loader = true;
  //   this.http.post('http://localhost:8080/update_user', this.merchant).subscribe(
  //     (res:any) => {
  //       if(res.data.affectedRows==1){
  //         // this.loader = false;
  //       }else{

  //       }
  //     }
  //   );
  // }

}
