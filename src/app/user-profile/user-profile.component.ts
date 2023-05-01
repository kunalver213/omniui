import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  loader : boolean = true;

  user: User = new User;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){

    this.user.id = 38;

    this.http.post('http://localhost:8080/getUser', this.user).subscribe(
      (res:any) => {
        if(res.length>0){
          this.user = res.data[0];
          this.loader = false;
        }
      }
    );
  }

  updateUser(){
    this.loader = true;
    this.http.post('http://localhost:8080/update_user', this.user).subscribe(
      (res:any) => {
        if(res.data.affectedRows==1){
          this.loader = false;
        }else{

        }
      }
    );
  }

}
