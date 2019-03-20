import {Inject, Component, OnInit } from '@angular/core';
import{ DialogDataExampleDialog } from './experience-dialog.component';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-experiencedetails',
  templateUrl: './experiencedetails.component.html',
  styleUrls: ['./experiencedetails.component.css']
})
export class ExperiencedetailsComponent  {
  step = 0;
  textValue='';
  txtvalues:[];
  
  constructor(public dialog: MatDialog) {

   
}


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  
  

  openDialog() {
    this.dialog.open(DialogDataExampleDialog, {
      height: '70%',
      width: '40%'
    });
    
  }
 
  //contacts: Array<Contact>;
  /*constructor(){
      this.contacts = [];
  }*/

 
}
