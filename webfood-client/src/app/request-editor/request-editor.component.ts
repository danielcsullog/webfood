import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Restaurant } from '../core/restaurant';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../core/user';

@Component({
  selector: 'app-request-editor',
  templateUrl: './request-editor.component.html',
  styleUrls: ['./request-editor.component.scss'],
})
export class RequestEditorComponent implements OnInit {

  requestForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    userName: ['', Validators.required],
    password: ['', Validators.required],
  })

  requestTypes!: string[];
  selectedTypeAsString!: string;
  selectedRestaurantToDelete!: Restaurant;
  selectedRestaurantToApply!: Restaurant;
  selectedRestaurantToResign!: Restaurant;

  selectedRestaurantToDismissFrom!: Restaurant;
  selectedUserToDismiss!: User;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RequestEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      myRestaurants: Restaurant[],
      restaurants: Restaurant[],
      workPlaces: Restaurant[],
    }
  ) {
    //this.requestTypes = Object.values(RequestType);
    this.requestTypes = [
      "New restaurant",
      "Delete restaurant",
      "Edit restaurant",
      "Applying for a job",
      "Resign from work",
      "Dismiss an employee",
    ]
  }

  ngOnInit(): void {
    
  }

  closeDialog() {
    this.dialogRef.close();
  }

  deleteRestaurant() {

  }

  applyJob() {

  }

  resignJob() {

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
