import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { NavModule } from '../nav/nav.module'
import { StartPageComponent } from './startPage/startPage.component';
import { LoginPageComponent } from './loginPage/loginPage.component'
import { RegisterPageComponent } from './registerPage/registerPage.component'
import { HomePageComponent } from './homePage/homePage.component'
import { DialogAddSubjectComponent } from './dialogs/dialog-add-subject.component'
import { DialogAddNoteComponent } from './dialogs/dialog-add-note.component'

import { 
  MatExpansionModule,
  MatListModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  } from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularEditorModule } from '@kolkov/angular-editor';



@NgModule({
  declarations: [
    StartPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HomePageComponent,
    DialogAddSubjectComponent,
    DialogAddNoteComponent
  ],
  imports: [
    BrowserModule,
    NavModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatListModule,
    AngularEditorModule,
  ],
  exports: [
    StartPageComponent, LoginPageComponent
  ],
  entryComponents: [
    DialogAddSubjectComponent,
    DialogAddNoteComponent
  ],
  
})
export class PagesModule { }
