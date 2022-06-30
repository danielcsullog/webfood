import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Restaurant } from '../../core/restaurant';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../core/user';
import { RequestService } from '../service/request.service';
import { Constants } from 'src/app/core/constants';
import { RestaurantService } from 'src/app/restaurants/service/restaurant.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-request-editor',
  templateUrl: './request-editor.component.html',
  styleUrls: ['./request-editor.component.scss'],
})
export class RequestEditorComponent implements OnInit {

  reqTypeNewRestaurantString = Constants.REQUEST_TYPE_NEW_RESTAURANT;
  reqTypeDelRestaurantString = Constants.REQUEST_TYPE_DEL_RESTAURANT;
  reqTypeEditRestaurantString = Constants.REQUEST_TYPE_EDIT_RESTAURANT;
  reqTypeApplyJobString = Constants.REQUEST_TYPE_APPLY_JOB;
  reqTypeResignJobString = Constants.REQUEST_TYPE_RESIGN_JOB;
  reqTypeDismissEmployeeString = Constants.REQUEST_TYPE_DISMISS_EMPLOYEE;

  requestTypes!: string[];
  selectedTypeAsString!: string;
  selectedRestaurantToEdit?: Restaurant;
  selectedRestaurantToDelete!: Restaurant;
  selectedRestaurantToApply!: Restaurant;
  selectedRestaurantToResign!: Restaurant;

  selectedRestaurantToDismissFrom!: Restaurant;
  selectedUserToDismiss!: User;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RequestEditorComponent>,
    private requestService: RequestService,
    @Inject(MAT_DIALOG_DATA) public data: {
      myRestaurants: Restaurant[],
      restaurants: Restaurant[],
      workPlaces: Restaurant[],
    }
  ) {
    this.requestTypes = [
      this.reqTypeNewRestaurantString,
      this.reqTypeDelRestaurantString,
      this.reqTypeEditRestaurantString,
      this.reqTypeApplyJobString,
      this.reqTypeResignJobString,
      this.reqTypeDismissEmployeeString,
    ]
  }

  ngOnInit(): void {
    console.log(this.data.restaurants);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  setServiceNewRequestType(requestTypeString: string) {
    switch (requestTypeString) {
      case this.reqTypeNewRestaurantString: {
        this.requestService.newRequestType = RequestType.RestaurantCreation;
        break;
      }
      case this.reqTypeDelRestaurantString: {
        this.requestService.newRequestType = RequestType.RestaurantDelete;
        break;
      }
      case this.reqTypeEditRestaurantString: {
        this.requestService.newRequestType = RequestType.RestaurantEdit;
        break;
      }
      case this.reqTypeApplyJobString: {
        this.requestService.newRequestType = RequestType.JobApplication;
        break;
      }
      case this.reqTypeResignJobString: {
        this.requestService.newRequestType = RequestType.JobResign;
        break;
      }
      case this.reqTypeDismissEmployeeString: {
        this.requestService.newRequestType = RequestType.JobFireEmployee;
        break;
      }
    }
  }
  
  createRequest(restaurant: Restaurant) {
    this.requestService.newRequestRestaurantId = restaurant.id;
    this.requestService.createRequest();
    this.closeDialog();
    window.location.reload();
  }

  //async createDeleteRestaurantRequest() {
  //  this.requestService.newRequestRestaurantId = this.selectedRestaurantToDelete.id;
  //  this.requestService.createRequest();
  //  this.closeDialog();
  //  window.location.reload();
 // }

 // applyJob() {
 //   this.requestService.newRequestRestaurantId = this.selectedRestaurantToDelete.id;
 //   this.
 // }

  dismissWorker(restaurant: Restaurant) {
    this.requestService.newRequestRestaurantId = restaurant.id;
    this.requestService.newRequest.userToFireId = this.selectedUserToDismiss.id;
    this.requestService.createRequest();
    this.closeDialog();
    window.location.reload();
  }
}

export enum RequestType {
  RestaurantCreation = 'CREATE_RESTAURANT',
  RestaurantDelete = 'DELETE_RESTAURANT',
  RestaurantEdit = 'EDIT_RESTAURANT',
  JobApplication = 'APPLICATION_JOB',
  JobResign = 'RESIGN_JOB',
  JobFireEmployee = 'FIRE_EMPLOYEE_JOB',
}
