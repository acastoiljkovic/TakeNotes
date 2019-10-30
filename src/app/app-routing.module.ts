import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartPageComponent } from './pages/startPage/startPage.component'
import { LoginPageComponent } from './pages/loginPage/loginPage.component'
import { RegisterPageComponent } from './pages/registerPage/registerPage.component'
import { HomePageComponent } from './pages/homePage/homePage.component';

import { AuthGuard } from './auth.guard'


// TO DO lock homePage until user isn't login

const routes: Routes = [
  {path: '', redirectTo:'/startPage', pathMatch: 'full' },
  {path: 'startPage', component: StartPageComponent },
  {path: 'registerPage', component: RegisterPageComponent },
  {path: 'loginPage', component: LoginPageComponent},
  {path: 'homePage', component: HomePageComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
