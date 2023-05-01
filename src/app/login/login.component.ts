import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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

  constructor(private http: HttpClient,private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    // if(localStorage.getItem('id')){
    //   this.router.navigate(['/home']);
    // }
    if(localStorage.getItem('owuitoken')){
        this.router.navigate(['/home']);
    }
  }


  login(){

    this.user.username = this.userVal;
    this.user.password = this.passVal;
    this.http.post('http://localhost:8080/login', this.user).subscribe(
      (res:any) => 
      {
        console.log(res)
        if(res.length>0){

          //////////////////////
          this.authService.login(this.userVal).subscribe( data => { 
            if(data) this.router.navigate(['/user-profile']); 
          });
      //////////////////////////////

          // this.user.merchantId = res.data[0].merchantId;
          // this.user.id = res.data[0].id;
          // this.user.password = undefined;
          // localStorage.setItem('id', JSON.stringify( this.user ) );
          // this.router.navigate(['/home']);  
          // window.location.reload();        
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
