import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../core/user';
import { UserService } from '../user/user.service';

export interface UserAuthRequest {
  name?: string;
  userName: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _token: string | null = null;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
  ) { }

  async login(userAuthRequest: UserAuthRequest) {
    const result = await (
      this.httpClient.post(
        '/api/users/login',
        userAuthRequest
      ) as Observable<LoginResponse>
    ).toPromise();

    this.setLoginResponse(result);
  }

  private setLoginResponse(result: LoginResponse | null) {
    if (!result) {
      this._token = null;
      this.userService.setUser(null);
      return;
    }

    this._token = result.access_token;
    this.userService.setUser(result.user);
  }

  get token() {
    return this._token;
  }

  get isLoggedIn() {
    return this.token ? true : false;
  }
}
