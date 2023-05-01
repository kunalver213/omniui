import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Merchant } from '../model/merchant.model';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-admin-all-merchant',
  templateUrl: './admin-all-merchant.component.html',
  styleUrls: ['./admin-all-merchant.component.css']
})
export class AdminAllMerchantComponent implements OnInit {

  loader : boolean = true;

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

  tranStatsSales : number = 0;
  tranStatsTransactions : number = 0;
  tranStatsFees : number = 0;
  tranStatsCommission : number = 0;

  constructor(private http: HttpClient) { }
  
  merchant: Merchant = new Merchant;

  ngOnInit(): void {
    this.getMerchantStats();
  }

  getMerchantStats(){
    this.http.post('http://localhost:8080/get_admin_all_merchant_stats', this.merchant).subscribe(
      (res:any) => {
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
          

          this.loader = false;
        }
      }
    );
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

}
