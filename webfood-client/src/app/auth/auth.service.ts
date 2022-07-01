import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../core/user';
import { UserService } from '../user/user.service';
import { AuthStorageService, LoginResponse } from './auth-storage.service';

export interface UserAuthRequest {
  name?: string;
  userName: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _token: string | null = null;

  get user() {
    return this.userService.user;
  }

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private authStorageService: AuthStorageService,
  ) {
    const result = this.authStorageService.loadUser();
    this.setLoginResponse(result);
  }

  async login(userAuthRequest: UserAuthRequest): Promise<string> {
    const result = await (
      this.httpClient.post(
        '/api/users/login',
        userAuthRequest, 
        {responseType: 'text' as 'json'}
      ) as Observable<string>
    ).toPromise();

    this.authStorageService.saveUser(JSON.parse(result));

    this.setLoginResponse(JSON.parse(result));

    return result;
  }

  logout() {
    this.setLoginResponse(null);
    this.authStorageService.saveUser(null);
  }

  async register(userAuthRequest: UserAuthRequest) {
    await (
      this.httpClient.post(
        '/api/users',
        userAuthRequest
      ) as Observable<User>
    ).toPromise();
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


