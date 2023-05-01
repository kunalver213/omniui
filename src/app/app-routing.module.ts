import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAllMerchantComponent } from './admin-all-merchant/admin-all-merchant.component';
import { AdminTranDetailComponent } from './admin-tran-detail/admin-tran-detail.component';
import { DownloadReportComponent } from './download-report/download-report.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MerchantProfileComponent } from './merchant-profile/merchant-profile.component';
import { SignupComponent } from './signup/signup.component';
import { TerminalDetailComponent } from './terminal-detail/terminal-detail.component';
import { TranscationHistoryComponent } from './transcation-history/transcation-history.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminMerchantListComponent } from './admin-merchant-list/admin-merchant-list.component';
import { AuthOmniGuard } from './auth-omni.guard';
import { AdminMerchantDetailComponent } from './admin-merchant-detail/admin-merchant-detail.component';
import { AdminGraphsComponent } from './admin-graphs/admin-graphs.component';
import { AdminToptenComponent } from './admin-topten/admin-topten.component';
import { AdminDownloadReportComponent } from './admin-download-report/admin-download-report.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthOmniGuard] },
  { path: 'transcation-history', component: TranscationHistoryComponent, canActivate: [AuthOmniGuard] },
  { path: 'download-report', component: DownloadReportComponent, canActivate: [AuthOmniGuard] },
  { path: 'terminal-detail', component: TerminalDetailComponent, canActivate: [AuthOmniGuard] },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthOmniGuard] },
  { path: 'merchant-profile', component: MerchantProfileComponent, canActivate: [AuthOmniGuard] },
  { path: 'admin-all-merchant', component: AdminAllMerchantComponent },
  { path: 'admin-tran-detail', component: AdminTranDetailComponent },
  { path: 'admin-merchant-list', component: AdminMerchantListComponent },
  { path: 'admin-merchant-detail', component: AdminMerchantDetailComponent },
  { path: 'admin-graphs', component: AdminGraphsComponent },
  { path: 'admin-topten', component: AdminToptenComponent },
  { path: 'admin-download-report', component: AdminDownloadReportComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
