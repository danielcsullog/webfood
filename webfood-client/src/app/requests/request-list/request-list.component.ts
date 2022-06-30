import { Component, Input, OnInit } from '@angular/core';
import { Request, RequestStatus } from 'src/app/core/request'
import { Restaurant } from 'src/app/core/restaurant';
import { RestaurantService } from 'src/app/restaurants/service/restaurant.service';
import { UserService } from 'src/app/user/user.service';
import { RequestType } from '../request-editor/request-editor.component';
import { RequestService } from '../service/request.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {

  @Input() requests: Request[] = [];

  @Input() showButtonsInPage: boolean = true;

  constructor(
    private requestService: RequestService,
    private restaurantService: RestaurantService,
    private userService: UserService,
  ) { }

  get userIsAdmin() {
    return this.userService.isAdmin;
  }

  ngOnInit(): void {
  }

  async getRestaurant(request: Request): Promise<Restaurant> {
    return await this.restaurantService.getRestaurant(request.restaurantId);
  }

  setStatusViewed(request: Request) {
    if (this.userService.isAdmin && request.status === RequestStatus.Sent) {
      request.status = RequestStatus.Viewed;

      this.requestService.updateRequest(request);
    }
  }

  setStatusInProgress(request: Request) {
    if (!this.userService.isAdmin) {
      return;
    }
    request.status = RequestStatus.InProgress;
    this.requestService.updateRequest(request);
  }

  async acceptRequest(request: Request) {
    const restaurant = await this.getRestaurant(request);
    if (!this.userService.isAdmin &&
      this.userService.user !== restaurant.owner) {
      return;
    }


    if (this.userService.isAdmin) {
      if (request.type === RequestType.RestaurantCreation ||
        request.type === RequestType.RestaurantEdit) {
        restaurant.allowed = true;
      } else if (request.type === RequestType.RestaurantDelete) {
        this.restaurantService.deleteRestaurant(restaurant);
      } else if (request.type === RequestType.JobFireEmployee) {
        const workerIndex = restaurant.workers!
          .findIndex(user => user.id == request.userToFireId);
        if (workerIndex > -1) {
          restaurant.workers!.splice(workerIndex, 1);
        }
        this.restaurantService.updateRestaurant(restaurant);
      }
    } 
    if (restaurant.owner!.id === this.userService.user!.id) {
      if (request.type === RequestType.JobApplication) {
        restaurant.workers!.push(request.user);
        this.restaurantService.updateRestaurant(restaurant);
      } else if (request.type === RequestType.JobResign) {
        const workerIndex = restaurant.workers!
          .findIndex(user => user.id == request.user.id);
        if (workerIndex > -1) {
          restaurant.workers!.splice(workerIndex, 1);
        }
        this.restaurantService.updateRestaurant(restaurant);
      }
    }
    request.status = RequestStatus.Accepted;
    request.completionDate = new Date();
    await this.requestService.updateRequest(request);
    await this.restaurantService.updateRestaurant(restaurant);
  }


  async refuseRequest(request: Request) {
    const restaurant = await this.getRestaurant(request);
    if (!this.userService.isAdmin &&
      this.userService.user!.id !== restaurant.owner!.id) {
      return;
    }

    if (request.type === RequestType.RestaurantCreation) {
      this.restaurantService.deleteRestaurant(restaurant);
    }

    request.status = RequestStatus.Refused;
    request.completionDate = new Date();
    await this.requestService.updateRequest(request);
  }

  getRequestStatus(request: Request) {
    return request.status;
  }

  needToShowButtons(request: Request): boolean {
    if (request.status !== RequestStatus.Accepted &&
      request.status !== RequestStatus.Refused &&
      this.showButtonsInPage) {
      return true;
    }

    return false;
  }
}
