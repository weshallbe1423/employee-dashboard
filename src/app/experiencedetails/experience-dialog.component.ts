import {Inject, Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import{SkillSet} from './skills';

export interface DialogData {
    animal: 'panda' | 'unicorn' | 'lion';
  }
@Component({
    selector: 'dialog-data-example-dialog',
    templateUrl: 'experience-dialog.html',
  })
  export class DialogDataExampleDialog {
    skill: Array<SkillSet>;
    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.skill=[];
    }
    
    
    
    addSkills(name,months):void{
      let contact = new SkillSet(name,months);
      this.skill.push(contact);
  }

  removeSkills(_skill){
      let index = this.skill.indexOf(_skill);
      this.skill.splice(index,1);
  }
}