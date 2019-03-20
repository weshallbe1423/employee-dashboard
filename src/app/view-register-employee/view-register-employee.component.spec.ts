import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRegisterEmployeeComponent } from './view-register-employee.component';

describe('ViewRegisterEmployeeComponent', () => {
  let component: ViewRegisterEmployeeComponent;
  let fixture: ComponentFixture<ViewRegisterEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRegisterEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRegisterEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
