import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminToptenComponent } from './admin-topten.component';

describe('AdminToptenComponent', () => {
  let component: AdminToptenComponent;
  let fixture: ComponentFixture<AdminToptenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminToptenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminToptenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
