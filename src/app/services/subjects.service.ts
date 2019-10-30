import { Injectable, OnInit, OnDestroy } from '@angular/core';

import { Note } from '../models/note.model';
import { SubjectModel } from '../models/subjectModel.model'
import { Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/person.model';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class SubjectsService implements OnInit,OnDestroy{

    private isAuth = false;
    private person: Person = null;

    private authListener: Subscription;

    private subjects: SubjectModel[] =[];

    private startPageSubjects: SubjectModel[] = [];

    private subjectsUpdated = new Subject<SubjectModel[]>();

    getSubjectsUpdateListener(){
        return this.subjectsUpdated.asObservable();
    }

    constructor(private http: HttpClient, private authService: AuthService){
        this.person = this.authService.getPerson();
        this.authListener = this.authService.getAuthStatusListener().subscribe(res=>{
            this.person = res.person;
            this.isAuth = res.isAuthenticated;
        });
    }


    ngOnInit(){
        
    }

    ngOnDestroy(){
        this.authListener.unsubscribe();
    }

    getSubjects(){
         this.http.get<{message:String,subjects:any}>("http://localhost:3000/api/get/"+this.person.email).subscribe(data=>{
            this.subjects = data.subjects as SubjectModel[];
            this.subjectsUpdated.next([...this.subjects]);
        });
        return [...this.subjects];
    }

    addSubject(title: String, listNotes: Note[]){
        const subj: SubjectModel = {
            title: title,
            listNotes: listNotes
        };
        this.http.post<{message:String}>("http://localhost:3000/api/addSubject",{title:title,email:this.person.email}).subscribe(responseData=>{
            if(responseData.message == "Success"){
                this.getSubjects();
                return;
            }
            console.log("Error");
        });
    }

    addNoteToSubject(title:String,note:Note){
        this.http.post<{message:String}>("http://localhost:3000/api/addNote",{title:title,email:this.person.email,note:note}).subscribe(responseData=>{
            if(responseData.message == "Success"){
                this.getSubjects();
                return;
            }
            console.log("Error");
        });
    }

    removeSubject(title:String){
        this.http.delete("http://localhost:3000/api/deleteSubject/"+title+"/"+this.person.email).subscribe(()=>{
            this.getSubjects();
        }
        );
        
    }

    removeNote(subjectTitle:String,title:String){
        this.http.delete("http://localhost:3000/api/deleteNote/"+subjectTitle+"/"+this.person.email+"/"+title).subscribe(()=>{
            this.getSubjects();
        });
    }

    changeNoteTitle(subjectTitle:String,title:String,newTitle:String){
        this.http.put<{message:String}>("http://localhost:3000/api/editNote",{title:subjectTitle,email:this.person.email,noteTitle:title,newNoteTitle:newTitle}).subscribe(responseData=>{
            if(responseData.message == "Success"){
                this.getSubjects();
                return;
            }
            console.log("Error");
        });
    }

    getRandomSubjects(){
        this.http.get<{message:String,subjects:any}>("http://localhost:3000/api/getRandomSubjects").subscribe(data=>{
            this.startPageSubjects = data.subjects;
            this.subjectsUpdated.next([...this.startPageSubjects]);
        });
    }

    saveNote(subjectTitle:String,title:String,body:String){
        this.http.put<{message:String}>("http://localhost:3000/api/saveNote",{title:subjectTitle,email:this.person.email,noteTitle:title,body:body}).subscribe(responseData=>{
            if(responseData.message == "Success"){
                this.getSubjects();
                return;
            }
            console.log("Error");
        });
    }

    changeSubjectTitle(title:String,newTitle:String){
        this.http.put<{message:String}>("http://localhost:3000/api/editSubject",{title:title,email:this.person.email,newTitle:newTitle}).subscribe(responseData=>{
            if(responseData.message == "Success"){
                this.getSubjects();
                return;
            }
            console.log("Error");
        });
    }

}