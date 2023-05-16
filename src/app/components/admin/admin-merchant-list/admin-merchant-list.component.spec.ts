import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMerchantListComponent } from './admin-merchant-list.component';

describe('AdminMerchantListComponent', () => {
  let component: AdminMerchantListComponent;
  let fixture: ComponentFixture<AdminMerchantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMerchantListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMerchantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
