import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from 'src/app/config/apiConstants';
import { ApiHttpService } from 'src/app/services/api-http/api-http.service';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-download-report',
  templateUrl: './download-report.component.html',
  styleUrls: ['./download-report.component.css']
})
export class DownloadReportComponent implements OnInit {

  model: NgbDateStruct | undefined;

  faCalendarDay = faCalendarDay;

  user : any = new Object();

  pdfData : any;

  filesList : any = '';

  constructor(private calendar: NgbCalendar, private apiConstants: ApiConstants,
    private apiHttpService: ApiHttpService, private router: Router) { }

  ngOnInit(): void {    
    this.model = this.calendar.getToday();
    this.getEntityId(this.model);
  }

  getEntityId(val : any){
    this.user.datev = this.getDBDates(String(val.year), String(val.month), String(val.day));
    this.apiHttpService.post(this.apiConstants.GET_ENTITYID, this.user).subscribe( 
      (res:any) => {
        this.filesList = res.data;
      }
    );
  }


  downloadFile(fname:string){ 
    window.open(environment.domain+'/download_report/'+(fname.substring(fname.indexOf('_')+1))+'/'+localStorage.getItem('owuitoken'));
  }

  getDBDates(year : string, month : string, day : string){
    year = year.substring(2);
    if(month.length==1){
      month = '0'+month;
    }
    if(day.trim.length==1){
      day = '0'+day;
    }
    return year+month+day;
  }
  
  
  // getReport(){
  //   this.user.merchantId = 'ClaroBP'; 
  //   this.user.datev = this.model?.year+'-'+this.model?.month+'-'+this.model?.day;
  //   this.user.datev = '2023-01-01';

  //   this.http.post('http://localhost:8080/download_report', this.user).subscribe(
  //     (res:any) => {
  //       if(res.length>0){
  //         this.pdfData = res;
  //       }
  //     }
  //   );
  // }

  // downloadReport(){
  //   const doc = new jsPDF()

  //   var bodyArr:string[][] = [];
  //   var alphas:string[]; 

  //   this.pdfData.data.forEach(function (value: any) {
  //     alphas = [value.Dates, value.CardType, value.TransactionType, value.RetrivalReferance, value.Amount, value.TransactionStatus];
  //     bodyArr.push(alphas);
  //   }); 

  //   doc.setFontSize(20);
  //   doc.setTextColor(40);
  //   doc.text('Merchant : '+this.user.merchantId, 10, 22);

  //   doc..setFontSize(10);

  //   autoTable(doc, {
  //     head: [['Dates', 'Card Type', 'TransactionType', 'Retrival Referance', 'Amount','Transaction Status']],
  //     body: bodyArr,
  //     startY: 35,
  //   })

    

  //   doc.save('FIID_ReportName'+this.user.merchantId+'_YYMMDD.pdf')
  // }

 

}
