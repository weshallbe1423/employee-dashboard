import { Component, OnInit } from '@angular/core';
import {RegisterService} from '../services/register.service';
import { Register} from '../register'
@Component({
  selector: 'app-view-register-employee',
  templateUrl: './view-register-employee.component.html',
  styleUrls: ['./view-register-employee.component.css']
})
export class ViewRegisterEmployeeComponent implements OnInit {
  regiData:Register[];
  constructor(private rs:RegisterService) { }

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
    });
  }
}
