import { Injectable } from '@angular/core';
import { User } from '../core/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: User | null = null;

  get User() {
    return this._user;
  }

  constructor() { }

  setUser(user: User | null) {
    this._user = user;
  }
}
