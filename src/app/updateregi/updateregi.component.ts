import { Component, OnInit } from '@angular/core';
import {Validators,FormBuilder,FormGroup} from '@angular/forms';
import{ActivatedRoute,Router} from '@angular/router';
import{RegisterService} from '../services/register.service';
@Component({
  selector: 'app-updateregi',
  templateUrl: './updateregi.component.html',
  styleUrls: ['./updateregi.component.css']
})
export class UpdateregiComponent implements OnInit {
  register: any = {};
  angForm: FormGroup;
  userID:any;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private bs: RegisterService,
    private fb: FormBuilder) {
      this.createForm();
 }

  createForm() {
    this.angForm = this.fb.group({
       email: ['', Validators.required ],
        password: ['', Validators.required ],
        
      });
    }


  ngOnInit() {
    //alert(this.bs.userID);
    
    this.route.params.subscribe(params => {
      //   this.bs.editUser(this.bs.userID).subscribe(res => {          
      //     this.register = res;
      // });
      this.bs.getUsers()
    .subscribe(res => {
      console.log(res);
      this.register = res[1];
      console.log("this.register", this.register);
    }, err => {
      console.log(err);
    });

    });
  }

  updateBusiness(email: any, mobile: any, pass: any){
    this.register.email=email;
    this.register.mobile=mobile;
    this.register.pass=pass;
alert(this.register);
console.log("this.register", this.register);
  }
}
