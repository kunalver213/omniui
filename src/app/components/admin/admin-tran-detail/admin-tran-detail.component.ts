import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faCalendarDay, faSearch, faDownload } from '@fortawesome/free-solid-svg-icons';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-admin-tran-detail',
  templateUrl: './admin-tran-detail.component.html',
  styleUrls: ['./admin-tran-detail.component.css']
})
export class AdminTranDetailComponent implements OnInit {

  modeldp1: NgbDateStruct | undefined;
  modeldp2: NgbDateStruct | undefined;

  
  loader : boolean = true;

  faCalendarDay = faCalendarDay;
  faSearch = faSearch;
  faDownload = faDownload;

  dateval : any = new Object();

  // pdfData : any;

  page: number = 1;
  count: number = 0;
  tableSize: number = 10;

  tranHistory : any;
  tranHistoryTab : any;
  tranHistoryTabAll : any;

  
  searchText:string = '';
  

  constructor(private http: HttpClient, private calendar: NgbCalendar) { }

  ngOnInit(): void {
    // this.postList();
  }


  postList(){

    if(!this.modeldp1 || !this.modeldp2){ return; }
    
    this.dateval.fromDate = '2022-02-01';
    this.dateval.toDate = '2023-03-12';

    this.dateval.fromDate = this.modeldp1?.year+'-'+this.modeldp1?.month+'-'+this.modeldp1?.day;

    this.http.post('http://localhost:8080/get_admin-tran-detail', this.dateval).subscribe(
      (res:any) => {
        if(res.length>0){
          this.tranHistoryTabAll = res.data; 
          this.tranHistoryTab = this.tranHistoryTabAll;
          if(this.searchText.length>0){
            this.filterData();
          }
          this.loader = false; 
        }
      }
    );

  }

  onTableDataChange(event:any){
    this.page = event;
    this.postList();
  }

  filterData(){
    this.tranHistoryTab = this.tranHistoryTabAll
    .filter((t: { RetailerId: any; })=> t.RetailerId.includes(this.searchText));
  }

  
  downloadReport(){
    const doc = new jsPDF()

    var bodyArr:string[][] = [];
    var alphas:string[]; 

    console.log(this.tranHistoryTab);

    this.tranHistoryTab.forEach(function (value: any) {
      alphas = [value.Datev, value.Amount, value.RRN, value.TransactionType, value.TraceNo, value.RetailerId];
      bodyArr.push(alphas);
    }); 

    doc.setFontSize(20);
    doc.setTextColor(40);
    doc.text('Transaction Details Report', 10, 22);

    doc.setFontSize(10);

    autoTable(doc, {
      head: [['Date', 'Amount', 'RRN', 'TransactionType', 'TraceNo','RetailerId']],
      body: bodyArr,
      startY: 35,
    })
    
    doc.save('Transaction_Details_Report_'+this.dateval.fromDate+'_To_'+this.dateval.toDate+'.pdf')
  }

 

}
