import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubjectModel } from '../../models/subjectModel.model';
import { Subscription } from 'rxjs';
import { Note } from '../../models/note.model'

import { SubjectsService } from '../../services/subjects.service'
import { MatDialog } from '@angular/material';
import { DialogAddSubjectComponent } from '../dialogs/dialog-add-subject.component';
import { DialogAddNoteComponent } from '../dialogs/dialog-add-note.component';


import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AuthService } from 'src/app/services/auth.service';




@Component({
  selector: 'app-home-page',
  templateUrl: './homePage.component.html',
  styleUrls: ['./homePage.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {
      subjects : SubjectModel[] = [];
      // TO DO File that holds every variable 
      editorConfig: AngularEditorConfig = {
        editable: true,
          spellcheck: true,
          height: 'auto',
          minHeight: '0',
          maxHeight: 'auto',
          width: 'auto',
          minWidth: '0',
          translate: 'yes',
          enableToolbar: true,
          showToolbar: true,
          placeholder: 'Enter text here...',
          defaultParagraphSeparator: '',
          defaultFontName: '',
          defaultFontSize: '',
          fonts: [
            {class: 'arial', name: 'Arial'},
            {class: 'times-new-roman', name: 'Times New Roman'},
            {class: 'calibri', name: 'Calibri'},
            {class: 'comic-sans-ms', name: 'Comic Sans MS'}
          ],
          customClasses: [
          {
            name: 'quote',
            class: 'quote',
          },
          {
            name: 'redText',
            class: 'redText'
          },
          {
            name: 'titleText',
            class: 'titleText',
            tag: 'h1',
          },
        ],
        uploadUrl: 'v1/image',
        sanitize: true,
        toolbarPosition: 'top',
    };
      private subjectSub: Subscription;

      constructor(public subjectService: SubjectsService,public authService:AuthService, public dialog: MatDialog){}

      ngOnInit(){
        this.subjects = this.subjectService.getSubjects();
        this.subjectSub = this.subjectService.getSubjectsUpdateListener()
        .subscribe((subj: SubjectModel[])=>{
            this.subjects = subj;
        });
      }

      saveNote(subjectTitle:String,title:String,body:String){
        this.subjectService.saveNote(subjectTitle,title,body);
      }

      onClick(title:String){

        document.getElementById("collapse"+title).className+=" show";
      }

      addSubject(title: String, listNotes: Note[]){
          this.subjectService.addSubject(title,listNotes);
      }

      addNote(title:String,note:Note){
          this.subjectService.addNoteToSubject(title,note);
      }
      openAddNoteDialog(titleSubject: String){
        const dialogRef = this.dialog.open(DialogAddNoteComponent, {
          width: '250px',
          data: {title: ""}
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          if(result!="" &&result!=null &&result!=undefined){
            this.subjectService.addNoteToSubject(titleSubject, {title:result,body:""});
          }
        });
      }

      openAddSubjectDialog(){
        const dialogRef = this.dialog.open(DialogAddSubjectComponent, {
          width: '250px',
          data: {title: ""}
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          if(result!="" &&result!=null &&result!=undefined ){
            this.subjectService.addSubject(result, []);
          }
        });
      }
      
      editNote(subjectTitle:String,title:String){
        const dialogRef = this.dialog.open(DialogAddNoteComponent, {
          width: '250px',
          data: {title: title}
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          if(result!="" &&result!=null &&result!=undefined){
            this.subjectService.changeNoteTitle(subjectTitle,title, result);
          }
        });
      }

      editSubject(title:String){
        const dialogRef = this.dialog.open(DialogAddSubjectComponent, {
          width: '250px',
          data: {title: title}
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          if(result!="" &&result!=null &&result!=undefined ){
            this.subjectService.changeSubjectTitle(title,result);
          }
        });
      };

      removeSubject(title:String){
        this.subjectService.removeSubject(title);
      }

      removeNote(subjectTitle:String,title:String){
        this.subjectService.removeNote(subjectTitle,title);
      }

      ngOnDestroy(){
        this.subjectSub.unsubscribe();
      }
}
