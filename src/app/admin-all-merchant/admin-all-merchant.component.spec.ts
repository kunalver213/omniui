import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllMerchantComponent } from './admin-all-merchant.component';

describe('AdminAllMerchantComponent', () => {
  let component: AdminAllMerchantComponent;
  let fixture: ComponentFixture<AdminAllMerchantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAllMerchantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAllMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
