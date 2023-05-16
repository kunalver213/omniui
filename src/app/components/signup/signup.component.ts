import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiConstants } from 'src/app/config/apiConstants';
import { ApiHttpService } from 'src/app/services/api-http/api-http.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  firstName: string = "";
  lastName: string = "";  
  merchantId: string = "";
  email: string = "";
  userName: string = "";
  password: string = "";
  confpassword: string = "";
  role: string = "MERCHANT_OWNER";
  scale: string = "small";
  expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  confpasswordCheck : boolean = false;
  emailCheck : boolean = false;
  merchantIdCheck : boolean = false;
  detailsCheck : boolean = false;

  signup: User = new User;

  constructor(private apiConstants: ApiConstants,
    private apiHttpService: ApiHttpService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('owuitoken')){
      this.router.navigate(['/home']);
    }
  }

  singup(){

    this.signup.firstName = this.firstName;
    this.signup.lastName = this.lastName;
    this.signup.merchantId = this.merchantId;
    this.signup.emailAddress = this.email;
    this.signup.username = this.userName;
    this.signup.password = this.password;
    this.signup.role = this.role;
    this.signup.scale = this.scale;

    this.detailsCheck = false;
    if(this.signup.firstName.trim() == '' || this.signup.lastName.trim() == '' || 
    this.signup.merchantId.trim() == '' || this.signup.emailAddress.trim() == '' || 
    this.signup.username.trim() == '' || this.signup.password.trim() == ''){
      this.detailsCheck = true;
      return;
    }

    this.emailCheck = false;
    if(!this.expression.test(this.signup.emailAddress)){
      this.emailCheck = true;
      return;
    }
    
    this.confpasswordCheck = false;
    if(this.password !== this.confpassword){
      this.confpasswordCheck = true;
      return;
    }

    this.merchantIdCheck = false;
    this.apiHttpService.post(this.apiConstants.SIGNUP_MERCH_CHECK, this.signup).subscribe(
      (res:any) => 
      {
        if(res.data[0].total>0){
          
          this.apiHttpService.post(this.apiConstants.SIGNUP, this.signup).subscribe(
            (res:any) => 
            {
              console.log(res)
              if(res.status="success"){
                this.router.navigate(['/home']);
              }else{ }
            },
            (err) => 
            {
              console.log(err)
            }
          );
          
        }else{
          this.merchantIdCheck = true;
          return;
        }
      }
    );
    
  }
  

}
