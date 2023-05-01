import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

  signup: User = new User;

  constructor(private http: HttpClient, private router: Router) { }

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

    if(!this.expression.test(this.signup.emailAddress)){
      this.email = "Invalid Email";
      return;
    }
    
    if(this.password !== this.confpassword){
      this.confpassword = "Password didnot match";
      return;
    }

    this.http.post('http://localhost:8080/signup_merch_check', this.signup).subscribe(
      (res:any) => 
      {
        if(res.length>0){
          
          this.http.post('http://localhost:8080/signup', this.signup).subscribe(
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
          this.merchantId = "Invalid MerchantId";
          return;
        }
      }
    );
    
  }
  

}
