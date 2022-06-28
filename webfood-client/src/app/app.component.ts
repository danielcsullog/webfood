import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  appTitle = 'webFood';

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get isAdmin(): boolean {
    return this.userService.isAdmin;
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
  ) {
    
  }

  ngOnInit() {

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/', 'login']);
  }

  getUserName(): string {
    return this.authService.user!.name;
  }

}
