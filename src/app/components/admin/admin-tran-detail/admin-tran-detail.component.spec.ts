import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTranDetailComponent } from './admin-tran-detail.component';

describe('AdminTranDetailComponent', () => {
  let component: AdminTranDetailComponent;
  let fixture: ComponentFixture<AdminTranDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTranDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTranDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
