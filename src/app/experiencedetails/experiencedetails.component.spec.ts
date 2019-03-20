import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperiencedetailsComponent } from './experiencedetails.component';

describe('ExperiencedetailsComponent', () => {
  let component: ExperiencedetailsComponent;
  let fixture: ComponentFixture<ExperiencedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperiencedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperiencedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
