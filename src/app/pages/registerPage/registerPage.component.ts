import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
        selector:'app-register-page',
        templateUrl:'./registerPage.component.html',
        styleUrls:['./registerPage.component.css']
})
export class RegisterPageComponent implements OnInit, OnDestroy{


    constructor(public authService: AuthService){}

    ngOnInit(){
    }

    onRegister(form:NgForm){

        // TO DO form validation

        // TO DO hash password and send all data about person to the personService which then forward this data to backend in order to register new person ( user )

        this.authService.register(form.value.firstName,form.value.lastName,form.value.email,form.value.password);
    }

    ngOnDestroy(){
    }
}