import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{RegisteremployeeComponent} from './registeremployee/registeremployee.component';
import { EmployeeprofileComponent } from './employeeprofile/employeeprofile.component';
import { ExperiencedetailsComponent } from './experiencedetails/experiencedetails.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HomeComponent } from './home/home.component';
import { ViewRegisterEmployeeComponent } from './view-register-employee/view-register-employee.component';

const appRoutes:Routes=[
  {path:'register',component:RegisteremployeeComponent},
  {path:'profile',component:EmployeeprofileComponent},
  {path:'experience',component:ExperiencedetailsComponent},
  {path:'display',component:ViewRegisterEmployeeComponent},
  {path:'home',component:HomeComponent}
  ,
  {
    path:'contact',component:ContactsComponent
  }
  ]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
