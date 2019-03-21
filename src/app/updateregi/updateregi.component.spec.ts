import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateregiComponent } from './updateregi.component';

describe('UpdateregiComponent', () => {
  let component: UpdateregiComponent;
  let fixture: ComponentFixture<UpdateregiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateregiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateregiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
