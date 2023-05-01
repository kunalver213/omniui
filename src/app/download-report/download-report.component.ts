import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

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

  filesList : any = 'xx';

  constructor(private calendar: NgbCalendar, private http: HttpClient) { }

  ngOnInit(): void {    
    this.model = this.calendar.getToday();
    this.getEntityId();
  }

  getEntityId(){
    this.user.merchantId = 'ClaroBP'; 
    this.user.datev = this.model?.year+'-'+this.model?.month+'-'+this.model?.day;
    this.user.datev = '230324';

    this.http.post('http://localhost:8080/get_entityid', this.user).subscribe( 
      (res:any) => {
        this.filesList = res.data;
      }
    );

    
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
