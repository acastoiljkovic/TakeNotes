import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
        selector:'app-login-page',
        templateUrl:'./loginPage.component.html',
        styleUrls:['./loginPage.component.css']
})
export class LoginPageComponent implements OnInit,OnDestroy{


    constructor(public authService: AuthService){}

    ngOnInit(){
      }

    onLogin(form:NgForm){
        // TODO Login code ...
        // if(form.invalid){
        //     if(form.value.email == "")
        //         document.getElementById("emailInput").className = "form-control border-danger";
            
        //     if(form.value.password == "")
        //         document.getElementById("passwordInput").className = "form-control border-danger";
        //     return;
        // }
        // window.alert("Email : " + form.value.email + " Password : "+form.value.password);
        // document.getElementById("emailInput").className = "form-control";
        // document.getElementById("passwordInput").className = "form-control";

        // TO DO form validation

        // TO DO hash password and send datas to personService, which then forward the request to backend, and get answer about login

        this.authService.login(form.value.email,form.value.password)
    }

    ngOnDestroy(){
      }
}