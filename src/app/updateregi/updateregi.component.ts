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
    this.route.params.subscribe(params => {
        this.bs.editBusiness(params['id']).subscribe(res => {
          this.register = res;
      });
    });
  }
}
