import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from 'src/app/core/restaurant';
import { Request, RequestStatus } from 'src/app/core/request'
import { RequestType } from '../request-editor/request-editor.component';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private _newRequest: Request = {
    user: this.userService.user!,
    type: null,
    status: RequestStatus.Sent,
    restaurantId: 0,
    text: "",
  };

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
  ) {

  }

  get newRequest() {
    return this._newRequest;
  }

  set newRequestRestaurantId(id: number) {
    this._newRequest.restaurantId = id;
  }

  set newRequestType(type: RequestType) {
    this._newRequest.type = type;
    console.log(this._newRequest.type);
  }

  async createRequest(): Promise<Request> {
    return await (
      this.httpClient.post(
        '/api/requests',
        this._newRequest
      ) as Observable<Request>
    ).toPromise();
  }

  async getAllRequests(): Promise<Request[]> {
    return (
      this.httpClient.get(
        '/api/requests'
      ) as Observable<Request[]>
    ).toPromise();
  }

  async getOnlyUserRequests(): Promise<Request[]> {
    return (
      this.httpClient.get(
        '/api/requests/user'
      ) as Observable<Request[]>
    ).toPromise();
  }

  async updateRequest(updatedRequest: Request) {
    return (
      this.httpClient.patch(
        `api/requests/${updatedRequest.id}`,
        updatedRequest
      ) as Observable<Request>
    ).toPromise();
  }
}
