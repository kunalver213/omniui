import { Component, OnInit } from '@angular/core';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-download-report',
  templateUrl: './admin-download-report.component.html',
  styleUrls: ['./admin-download-report.component.css']
})
export class AdminDownloadReportComponent implements OnInit {

  model: NgbDateStruct | undefined;

  faCalendarDay = faCalendarDay;

  user : any = new Object();

  pdfData : any;

  filesList : any;

  constructor(private calendar: NgbCalendar, private http: HttpClient) { }

  ngOnInit(): void {    
    this.model = this.calendar.getToday();
    this.getEntityId();
  }

  getEntityId(){
    this.user.merchantId = 'ClaroBP'; 

    let yrVal: string = ''+this.model?.year;
    let mthVal: string = ''+this.model?.month;
    let dyVal: string = ''+this.model?.day;

    // this.user.datev = this.model?.year+'-'+this.model?.month+'-'+this.model?.day;
    // console.log(this.user.datev);
    this.user.datev = yrVal+'-'+mthVal+'-'+dyVal;
    console.log(this.user.datev);
    this.user.datev = '230324';
    console.log(this.user.datev); 

    this.http.post('http://localhost:8080/get_entityid_admin', this.user).subscribe( 
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
