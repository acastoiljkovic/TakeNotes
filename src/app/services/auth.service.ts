import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { Person } from '../models/person.model';
import { AuthModel } from '../models/auth.model';

@Injectable({ providedIn: "root" })
export class AuthService {

    private isAuthenticated = false;
    private person: Person;
    private authStatusListener = new Subject<AuthModel>();

    constructor(private http: HttpClient, private router: Router) {}

    getIsAuth() {
        return this.isAuthenticated;
    }

    getPerson(){
        return this.person;
    }

    getFirstName(){
        if(this.isAuthenticated)
            return this.person.firstName;
        this.router.navigate(["/loginPage"]);
        return "Login First";
    }
    getLastName(){
        if(this.isAuthenticated)
            return this.person.lastName;
        this.router.navigate(["/loginPage"]);
        return "Login First";
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }
    

    register(firstName:string, lastName:string,email:string,password:string){
        const person : Person = {
            password:password,
            firstName:firstName,
            lastName:lastName,
            email:email
        }
        this.http.post<{ message: string,person:Person}>("http://localhost:3000/api/register",person).subscribe(responseData=>{
            if(responseData.message == "Success"){            
                this.person = responseData.person;
                this.isAuthenticated = true;
                this.authStatusListener.next({isAuthenticated:true,person:responseData.person});
                this.router.navigate(["/homePage"]);
            }
        });
    }

    login(email:String,password:String){
        this.http.post<{ message:String,person:Person}>("http://localhost:3000/api/login",{email:email,password:password}).subscribe(responseData=>{
            if(responseData.message == "Success"){            
                this.person = responseData.person;
                this.isAuthenticated = true;
                this.authStatusListener.next({isAuthenticated:true,person:responseData.person});
                this.router.navigate(["/homePage"]);
            }
        });
    }

    logout(){
        this.person = null;
        this.isAuthenticated = false;
        this.authStatusListener.next({isAuthenticated:false,person:null});
        this.router.navigate(["/loginPage"]);
    }
}