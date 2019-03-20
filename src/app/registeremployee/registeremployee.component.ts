import { Component, OnInit } from '@angular/core';
import{ Validators,FormGroup,FormBuilder} from '@angular/forms';
import {RegisterService} from '../services/register.service';
import { Register} from '../register'

import{Router} from '@angular/router'
import { AuthenticationService } from '../services/authentication.service';
import { AlertService} from '../services/alert.service';
@Component({
  selector: 'app-registeremployee',
  templateUrl: './registeremployee.component.html',
  styleUrls: ['./registeremployee.component.css']
})
export class RegisteremployeeComponent implements OnInit {
    
   registerForm: FormGroup;
   regiData:Register[];
   constructor(
     private rs: RegisterService,
      private fb: FormBuilder,
    private router:Router,
    private authenticationService:AuthenticationService,
    private alertService:AlertService) { 
     this.createForm();
     if (this.authenticationService.currentUserValue) { 
      this.router.navigate(['/home']);
  }
   }
 
 
   createForm() {
     this.registerForm = this.fb.group({
       email: ['', Validators.required ],
       password: ['', Validators.required ],
       mobile:['',Validators.minLength(10)]
    });
   }
/*
  registerUser(email,password){
    this.rs.registerUser(email,password);
  }
*/
  ngOnInit(){

    this.rs.getUsers()
    .subscribe(res => {
      console.log(res);
      this.regiData = res;
    }, err => {
      console.log(err);
    });
   
  }
  
  onSubmit() {
    this.rs.createUser(this.registerForm.value)
      .subscribe( data => {
        this.alertService.success("REGISTRATION SUCCESS!!",true)
        this.router.navigate(['home']);

        
      });
  }

  



}