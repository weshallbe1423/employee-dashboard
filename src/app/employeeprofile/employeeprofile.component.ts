import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup,Validators} from '@angular/forms'
@Component({
  selector: 'app-employeeprofile',
  templateUrl: './employeeprofile.component.html',
  styleUrls: ['./employeeprofile.component.css']
})
export class EmployeeprofileComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      middleCtrl:['',Validators.required],
      lastCtrl:['',Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      plotCtrl: ['', Validators.required],
      localityCtrl:['',Validators.required],
      landamarkCtrl:['',Validators.required]
    });
  }
}
