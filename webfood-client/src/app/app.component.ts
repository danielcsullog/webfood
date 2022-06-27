import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './core/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  appTitle = 'webFood';
  currentUser!: User;

  constructor(
    private httpClient: HttpClient,
  ) {
    
  }

  async ngOnInit(): Promise<User> {
    this.currentUser = await this.getCurrentUser();
    return this.currentUser;
  }

  async getCurrentUser(): Promise<User> {
    return await (
      this.httpClient.get('/api/users/current-user') as Observable<User>
    ).toPromise();
  }

}
