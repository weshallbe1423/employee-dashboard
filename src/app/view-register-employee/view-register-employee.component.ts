import { Component, OnInit } from '@angular/core';
import {RegisterService} from '../services/register.service';
import { Register} from '../register'
import {AlertService} from '../services/alert.service';
import {Router} from '@angular/router';
  @Component({
  selector: 'app-view-register-employee',
  templateUrl: './view-register-employee.component.html',
  styleUrls: ['./view-register-employee.component.css']
})
export class ViewRegisterEmployeeComponent implements OnInit {
  regiData:Register[];
  constructor(private rs:RegisterService,
          private alertService:AlertService,
          private router:Router) { }
  ngOnInit() {
    this.rs.getUsers()
    .subscribe(res => {
      console.log(res);
      this.regiData = res;
    }, err => {
      console.log(err);
    });

    
  }

  
  deleteUser(id) {
    this.rs.deleteUser(id).subscribe(res => {
      console.log('Deleted');
      this.alertService.success("Deleted Successfully",true)
      this.router.navigate['/display'];
      
    });
}
 
}
