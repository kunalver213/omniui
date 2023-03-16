import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Signup } from '../model/signup.model';
import { Router } from '@angular/router';
import { Login } from '../model/login.model';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  faPlus = faPlus;

  displayStyle = "none";
  canvas: any;
  ctx: any;
  @ViewChild('salesLineChart') salesLineChart: any;
  transactionsLineChartcanvas: any;
  transactionsLineChartctx: any;
  @ViewChild('transactionsLineChart') transactionsLineChart: any;
  feesLineChartcanvas: any;
  feesLineChartctx: any;
  @ViewChild('feesLineChart') feesLineChart: any;
  commissionLineChartcanvas: any;
  commissionLineChartctx: any;
  @ViewChild('commissionLineChart') commissionLineChart: any;
  barcanvas: any;
  barctx: any;
  @ViewChild('barRespCodeChart') barRespCodeChart: any;
  piecanvas: any;
  piectx: any;
  @ViewChild('pieRespTypeChart') pieRespTypeChart: any;
  pieCardBrandChartcanvas: any;
  pieCardBrandChartctx: any;
  @ViewChild('pieCardBrandChart') pieCardBrandChart: any;
  tranBarcanvas: any;
  tranBarctx: any;
  @ViewChild('tranBarChart') tranBarChart: any;

  latestTran : any;
  tranStatsSales : number = 0;
  tranStatsTransactions : number = 0;
  tranStatsFees : number = 0;
  tranStatsCommission : number = 0;
  transPop : any;
  
  constructor(private http: HttpClient) { }

  user: Signup = new Signup;

  ngOnInit(): void {
    
  }

  

  
  ngAfterViewInit() { 

    this.user.merchantId = 'ClaroBP';

    this.http.post('http://localhost:8080/home_trans_stats', this.user).subscribe(
      (res:any) => 
      {
        if(res.length>0){

          var salesLabelsVal = new Array();
          var salesdataVal = new Array();
          var tranLabelsVal = new Array();
          var trandataVal = new Array();
          var commLabelsVal = new Array();
          var commdataVal = new Array();
          var feeLabelsVal = new Array();
          var feedataVal = new Array();

          for (let i = 0; i < res.data.length; i++) {
            if(res.data[i].grp=='sales'){
              salesLabelsVal.push(res.data[i].datev);
              salesdataVal.push(res.data[i].amt);
              this.tranStatsSales += 1;
            }
            else if(res.data[i].grp=='tran'){
              tranLabelsVal.push(res.data[i].datev);
              trandataVal.push(res.data[i].amt);
              this.tranStatsTransactions += 1;
            }else if(res.data[i].grp=='comm'){
              commLabelsVal.push(res.data[i].datev);
              commdataVal.push(res.data[i].amt);
              this.tranStatsCommission += 1;
            }else if(res.data[i].grp=='fees'){
              feeLabelsVal.push(res.data[i].datev);
              feedataVal.push(res.data[i].amt);
              this.tranStatsFees += 1;
            }
          }
          
          this.createsalesLineChart(salesLabelsVal, salesdataVal);
          this.createtransactionsLineChart(tranLabelsVal, trandataVal);
          this.createcommissionLineChart(commLabelsVal, commdataVal);
          this.createfeesLineChart(feeLabelsVal, feedataVal);
          
        }else{
        
        }
      }
    );

    // this.http.post('http://localhost:8080/tran_history', this.user).subscribe(
    //   (res:any) => {
    //     if(res.length>0){
    //       this.tranStats = res.data[0]; 
    //     }
    //   }
    // );

    this.http.post('http://localhost:8080/home_trans_latest', this.user).subscribe(
      (res:any) => {
        if(res.length>0){
          this.latestTran = res.data; 
        }
      }
    );

    this.http.post('http://localhost:8080/home_resp_type', this.user).subscribe(
      (res:any) => {
        if(res.length>0){

          var respTypeLables = new Array("Success","Declined");
          var respTypeData = new Array((Math.round(res.data[0].successfulTransactions * 100) / 100).toFixed(1), (Math.round(res.data[0].declainedTransactions * 100) / 100).toFixed(1));

          this.createPieRespTypeChart(respTypeLables, respTypeData);
        }
      }
    );

    this.http.post('http://localhost:8080/home_card_brand_type', this.user).subscribe(
      (res:any) => {
        if(res.length>0){

          var respCardBarndLables = new Array("Visa","MasterCard","Maestro");
          var respCardBarndData = new Array((Math.round(res.data[0].VisaTransactions * 100) / 100).toFixed(1), (Math.round(res.data[0].MasterCardTransactions * 100) / 100).toFixed(1), (Math.round(res.data[0].MaestroTransactions * 100) / 100).toFixed(1));

          this.createPieCardBrandChart(respCardBarndLables, respCardBarndData);
        }
      }
    );

    this.http.post('http://localhost:8080/home_tran_type', this.user).subscribe(
      (res:any) => {
        if(res.length>0){

          var respCardBarndLables = new Array("Purchase","Refund","Total");
          var respCardBarndData = new Array(res.data[0].PurchaseTransactions, res.data[0].RefundTransactions, res.data[0].TotalTransactions);

          this.createTranBarChart(respCardBarndLables, respCardBarndData);
        }
      }
    );

    this.http.post('http://localhost:8080/home_resp_code', this.user).subscribe(
      (res:any) => {
        if(res.length>0){

          var barRespCodeLables = new Array();
          var barRespCodeData = new Array();

          for (let i = 0; i < res.data.length; i++) {
            barRespCodeLables.push( (res.data[i].ResponseDesc==null ? '00' : res.data[i].ResponseDesc) );
            barRespCodeData.push(res.data[i].count);            
          }

          this.createbarRespCodeChart(barRespCodeLables, barRespCodeData); 
        }
      }
    );

  }
  
  openPopup(tran:any) {
    console.log(tran);
    this.transPop = tran;
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  createsalesLineChart(labelsVal:any,dataVal:any){
    this.canvas = this.salesLineChart.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    var gradient = this.ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, '#ec250dc4');
    gradient.addColorStop(0.5, '#ec250d6b');
    gradient.addColorStop(1, '#ec250d0d');

    new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: labelsVal,
        datasets: [{
          backgroundColor: gradient,
          borderColor: '#ec250d',
          pointBackgroundColor: '#ec250d',
          label: ' Amount',
          fill: true,
          data: dataVal,
        }]
      },
      options: {
        plugins:{
          legend:{
            display: false
          }
        },
        elements:{
          line:{
            tension: 0.4
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            border:{
              color:'white'
            },
            grid:{
              color: "rgba(0, 0, 0, 0)"
            }
          },
          x: {
            beginAtZero: true,
            border:{
              color:'white'
            }
          }
        }
      }
    });
    
  
  }

  createtransactionsLineChart(tranLabelsVal:any, trandataVal:any){
    this.transactionsLineChartcanvas = this.transactionsLineChart.nativeElement;
    this.transactionsLineChartctx = this.transactionsLineChartcanvas.getContext('2d');

    var gradient = this.transactionsLineChartctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, '#ec250dc4');
    gradient.addColorStop(0.5, '#ec250d6b');
    gradient.addColorStop(1, '#ec250d0d');

    new Chart(this.transactionsLineChartctx, {
      type: 'line',
      data: {
        labels: tranLabelsVal,
        datasets: [{
          backgroundColor: gradient,
          borderColor: '#ec250d',
          pointBackgroundColor: '#ec250d',
          label: ' Amount',
          fill: true,
          data: trandataVal,
        }]
      },
      options: {
        plugins:{
          legend:{
            display: false
          }
        },
        elements:{
          line:{
            tension: 0.4
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            border:{
              color:'white'
            },
            grid:{
              color: "rgba(0, 0, 0, 0)"
            }
          },
          x: {
            beginAtZero: true,
            border:{
              color:'white'
            }
          }
        }
      }
    });
    
  
  }

  createfeesLineChart(feeLabelsVal:any, feedataVal:any){
    this.feesLineChartcanvas = this.feesLineChart.nativeElement;
    this.feesLineChartctx = this.feesLineChartcanvas.getContext('2d');

    var gradient = this.feesLineChartctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, '#ec250dc4');
    gradient.addColorStop(0.5, '#ec250d6b');
    gradient.addColorStop(1, '#ec250d0d');

    new Chart(this.feesLineChartctx, {
      type: 'line',
      data: {
        labels: feeLabelsVal,
        datasets: [{
          backgroundColor: gradient,
          borderColor: '#ec250d',
          pointBackgroundColor: '#ec250d',
          label: ' Amount',
          fill: true,
          data: feedataVal,
        }]
      },
      options: {
        plugins:{
          legend:{
            display: false
          }
        },
        elements:{
          line:{
            tension: 0.4
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            border:{
              color:'white'
            },
            grid:{
              color: "rgba(0, 0, 0, 0)"
            }
          },
          x: {
            beginAtZero: true,
            border:{
              color:'white'
            }
          }
        }
      }
    });
    
  
  }
  
  createcommissionLineChart(commLabelsVal:any, commdataVal:any){
    this.commissionLineChartcanvas = this.commissionLineChart.nativeElement;
    this.commissionLineChartctx = this.commissionLineChartcanvas.getContext('2d');

    var gradient = this.commissionLineChartctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, '#ec250dc4');
    gradient.addColorStop(0.5, '#ec250d6b');
    gradient.addColorStop(1, '#ec250d0d');

    new Chart(this.commissionLineChartctx, {
      type: 'line',
      data: {
        labels: commLabelsVal,
        datasets: [{
          backgroundColor: gradient,
          borderColor: '#ec250d',
          pointBackgroundColor: '#ec250d',
          label: ' Amount',
          fill: true,
          data: commdataVal,
        }]
      },
      options: {
        plugins:{
          legend:{
            display: false
          }
        },
        elements:{
          line:{
            tension: 0.4
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            border:{
              color:'white'
            },
            grid:{
              color: "rgba(0, 0, 0, 0)"
            }
          },
          x: {
            beginAtZero: true,
            border:{
              color:'white'
            }
          }
        }
      }
    });
    
  
  }


  createbarRespCodeChart(barRespCodeLables:any, barRespCodeData:any){
    this.barcanvas = this.barRespCodeChart.nativeElement;
    this.barctx = this.barcanvas.getContext('2d');

    new Chart(this.barctx, {
      type: "bar",
      data: {
        labels: barRespCodeLables,
        datasets: [{
          label: 'RespCode',
          data: barRespCodeData,
          backgroundColor: '#682861',
          categoryPercentage: 1.2,
        }]
      },
      options: {
        indexAxis: 'y',
      }
    });    
  
  }

  createPieRespTypeChart(respTypeLables:any, respTypeData:any){
    this.piecanvas = this.pieRespTypeChart.nativeElement;
    this.piectx = this.piecanvas.getContext('2d');

    new Chart(this.piectx, {
      type: "doughnut",
      data: {
        
        labels: respTypeLables,
        datasets: [{
          label: ' Percent ',
          data: respTypeData,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      }
    });    
  
  }
  
  createPieCardBrandChart(respCardBarndLables:any, respCardBarndData:any){
    this.pieCardBrandChartcanvas = this.pieCardBrandChart.nativeElement;
    this.pieCardBrandChartctx = this.pieCardBrandChartcanvas.getContext('2d');

    new Chart(this.pieCardBrandChartctx, {
      type: "doughnut",
      data: {
        
        labels: respCardBarndLables,
        datasets: [{
          label: 'My First Dataset',
          data: respCardBarndData,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      }
    });    
  
  }

  createTranBarChart(respCardBarndLables:any, respCardBarndData:any){
    this.tranBarcanvas = this.tranBarChart.nativeElement;
    this.tranBarctx = this.tranBarcanvas.getContext('2d');

    new Chart(this.tranBarctx, {
      type: "bar",
      data: {
        labels: respCardBarndLables,
        datasets: [{
          label: 'TxnCount',
          data: respCardBarndData,
          backgroundColor: '#6574cd',
          categoryPercentage: 0.2,
        }]
      },
      options: {
      }
    });    
  
  }




}
