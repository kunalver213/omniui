import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DownloadReportComponent } from './download-report/download-report.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TranscationHistoryComponent } from './transcation-history/transcation-history.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'transcation-history', component: TranscationHistoryComponent },
  { path: 'download-report', component: DownloadReportComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
