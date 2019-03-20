import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisteremployeeComponent } from './registeremployee/registeremployee.component';
import { EmployeeprofileComponent } from './employeeprofile/employeeprofile.component';
import { ExperiencedetailsComponent } from './experiencedetails/experiencedetails.component';
import{RegisterService} from './services/register.service';
import { HttpClientModule } from '@angular/common/http';

import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DialogDataExampleDialog} from './experiencedetails/experience-dialog.component'
import {MatDialogModule} from '@angular/material/dialog';
import { ContactsComponent } from './contacts/contacts.component';
import { HomeComponent } from './home/home.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ViewRegisterEmployeeComponent } from './view-register-employee/view-register-employee.component';
import {MatTableModule} from '@angular/material/table';
@NgModule({
  declarations: [
    AppComponent,
    RegisteremployeeComponent,
    EmployeeprofileComponent,
    ExperiencedetailsComponent,
    DialogDataExampleDialog,
    ContactsComponent,
    HomeComponent,
    ViewRegisterEmployeeComponent
  ],
  entryComponents: [DialogDataExampleDialog ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,

  
    MatTableModule,
    MatRadioModule,
    MatCardModule,
    MatCheckboxModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSidenavModule
 
  ],
  providers: [ RegisterService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
