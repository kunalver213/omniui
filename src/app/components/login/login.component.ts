import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { User } from '../../model/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ApiConstants } from 'src/app/config/apiConstants';
import { environment } from 'src/environments/environment';
import { ApiHttpService } from 'src/app/services/api-http/api-http.service';

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
  user: User = new User;

  constructor(private http: HttpClient,
    private router: Router, 
    private authService: AuthService,
    private apiConstants: ApiConstants,
    private apiHttpService: ApiHttpService) { }

  ngOnInit(): void {
    if(localStorage.getItem('owuitoken')){
        localStorage.removeItem('owuitoken');
    }
  }


  login(){

    if(this.userVal.trim() == '' || this.passVal.trim() == ''){
      return;
    }

    this.user.username = this.userVal;
    this.user.password = this.passVal;

    this.apiHttpService.post(this.apiConstants.LOGIN, this.user).subscribe(
      (res:any) => 
      {
        if(res.length>0){
          this.authService.login(res.token).subscribe( data => { 
            if(data){ 
              window.open("/home", "_self");
            }
          }); 
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
