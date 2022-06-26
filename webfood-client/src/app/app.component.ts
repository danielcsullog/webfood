import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './core/user';
import { MealService } from './meals/service/meal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  currentUser!: User;

  constructor(
    private httpClient: HttpClient
  ) {
    
  }

  async ngOnInit(): Promise<void> {
    this.currentUser = await this.getCurrentUser();
  }

  async getCurrentUser(): Promise<User> {
    return await (
      this.httpClient.get('/api/users/current-user') as Observable<User>
    ).toPromise();
  }

  appTitle = 'webFood';
  badgeCount = 0;

}
