import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranscationHistoryComponent } from './transcation-history/transcation-history.component';

import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { DownloadReportComponent } from './download-report/download-report.component';
import { TerminalDetailComponent } from './terminal-detail/terminal-detail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MerchantProfileComponent } from './merchant-profile/merchant-profile.component';
import { AdminAllMerchantComponent } from './admin-all-merchant/admin-all-merchant.component';
import { AdminTranDetailComponent } from './admin-tran-detail/admin-tran-detail.component';
import { MerchantListComponent } from './merchant-list/merchant-list.component';
import { AdminMerchantListComponent } from './admin-merchant-list/admin-merchant-list.component';
import { AdminGraphsComponent } from './admin-graphs/admin-graphs.component';
import { AdminToptenComponent } from './admin-topten/admin-topten.component';
import { AdminMerchantDetailComponent } from './admin-merchant-detail/admin-merchant-detail.component';
import { AdminDownloadReportComponent } from './admin-download-report/admin-download-report.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    TranscationHistoryComponent,
    DownloadReportComponent,
    TerminalDetailComponent,
    UserProfileComponent,
    MerchantProfileComponent,
    AdminAllMerchantComponent,
    AdminTranDetailComponent,
    MerchantListComponent,
    AdminMerchantListComponent,
    AdminGraphsComponent,
    AdminToptenComponent,
    AdminMerchantDetailComponent,
    AdminDownloadReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
