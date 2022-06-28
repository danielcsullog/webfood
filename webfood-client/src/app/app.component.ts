import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  appTitle = 'webFood';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    
  }

  ngOnInit() {

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/', 'login']);
  }

}
