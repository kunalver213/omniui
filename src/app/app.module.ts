import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/user/home/home.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranscationHistoryComponent } from './components/user/transcation-history/transcation-history.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { DownloadReportComponent } from './components/user/download-report/download-report.component';
import { TerminalDetailComponent } from './components/user/terminal-detail/terminal-detail.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { MerchantProfileComponent } from './components/user/merchant-profile/merchant-profile.component';
import { AdminAllMerchantComponent } from './components/admin/admin-all-merchant/admin-all-merchant.component';
import { AdminTranDetailComponent } from './components/admin/admin-tran-detail/admin-tran-detail.component';
import { MerchantListComponent } from './components/user/merchant-list/merchant-list.component';
import { AdminMerchantListComponent } from './components/admin/admin-merchant-list/admin-merchant-list.component';
import { AdminGraphsComponent } from './components/admin/admin-graphs/admin-graphs.component';
import { AdminToptenComponent } from './components/admin/admin-topten/admin-topten.component';
import { AdminMerchantDetailComponent } from './components/admin/admin-merchant-detail/admin-merchant-detail.component';
import { AdminDownloadReportComponent } from './components/admin/admin-download-report/admin-download-report.component';
import { OmniInterceptorInterceptor } from './interceptor/omni-interceptor.interceptor';


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
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: OmniInterceptorInterceptor, multi: true,
    },
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
