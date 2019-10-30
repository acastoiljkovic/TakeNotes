import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  title = 'TakeNotes';

  userIsAuthenticated = false;
  firstName:String;
  lastName:String;
  private authListener : Subscription;

  constructor(private authService: AuthService){}

  ngOnInit(){
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListener = this.authService.getAuthStatusListener().subscribe(isAuth=>{
      this.userIsAuthenticated = isAuth.isAuthenticated;
      if(isAuth){
        this.firstName = this.authService.getFirstName();
        this.lastName = this.authService.getLastName();
      }
    });
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){

  }
}
