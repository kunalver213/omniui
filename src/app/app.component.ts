import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { Login } from './model/login.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'omniui';

  public chart: any;
  login: Login = new Login;
  header:boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(!localStorage.getItem('id')){
      this.router.navigate(['/']);
      this.header = false;
    }else{
      this.login = JSON.parse(localStorage.getItem('id') || '{}');
      this.header = true;
    }
    console.log(this.header);
  }

  logout(){
    localStorage.removeItem('id');
    this.router.navigate(['/']); 
    window.location.reload();      
  }

  createChart(){
  
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	       datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }  
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }

}



