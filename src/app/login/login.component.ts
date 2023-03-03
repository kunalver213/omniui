import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { Login } from '../model/login.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userVal: string = "";
  passVal: string = "";
  lblMsg = "Enter your username and password to sign in";
  lblMsgInvalid  = false;
  user: Login = new Login;

  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit(): void {
  }


  login(){
    this.user.user = this.userVal;
    this.user.password = this.passVal;
    this.http.post('http://localhost:8080/login', this.user).subscribe(
      (res:any) => 
      {
        console.log(res)
        if(res.length>0){
          this.router.navigate(['/home']);          
        }else{
          this.lblMsg = "Invalid User";
          this.lblMsgInvalid  = true;
        }
      },
      (err) => 
      {
        console.log(err)
      }
      );
  }


}
