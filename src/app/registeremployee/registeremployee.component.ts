import { Component, OnInit } from '@angular/core';
import{ Validators,FormGroup,FormBuilder} from '@angular/forms';
import {RegisterService} from '../register.service';
import { Register} from '../register'
import{Router} from '@angular/router'
@Component({
  selector: 'app-registeremployee',
  templateUrl: './registeremployee.component.html',
  styleUrls: ['./registeremployee.component.css']
})
export class RegisteremployeeComponent implements OnInit {
    
   registerForm: FormGroup;
   regiData:Register[];
   constructor(private rs: RegisterService, private fb: FormBuilder,
    private router:Router) { 
     this.createForm();
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
        this.router.navigate(['']);
        
      });
  }

  



}