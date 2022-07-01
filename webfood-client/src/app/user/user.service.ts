import { Injectable } from '@angular/core';
import { User, UserRole } from '../core/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: User | null = null;

  get user() {
    return this._user;
  }

  get isAdmin(): boolean {
    return this.user?.role === UserRole.Admin;
  }

  constructor() { }

  setUser(user: User | null) {
    console.log("SET_USER:");
    console.log(user);
    this._user = user;
  }
}
