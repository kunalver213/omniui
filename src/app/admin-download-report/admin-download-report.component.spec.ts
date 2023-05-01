import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDownloadReportComponent } from './admin-download-report.component';

describe('AdminDownloadReportComponent', () => {
  let component: AdminDownloadReportComponent;
  let fixture: ComponentFixture<AdminDownloadReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDownloadReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDownloadReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
