import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Restaurant } from 'src/app/core/restaurant';
import { RequestEditorComponent } from 'src/app/requests/request-editor/request-editor.component';
import { RequestService } from 'src/app/requests/service/request.service';
import { RestaurantService } from '../service/restaurant.service';

export enum RestaurantCategory {
  Fast = 'FASTFOOD',
  Street = 'STREETFOOD',
  Buffet = 'BUFFET',
  Bistro = 'BISTRO',
  Bakery = 'BAKERY',
  Confectionary = 'CONFECTIONARY',
  Canteen = 'CANTEEN',
  Fine = 'FINEDINING',
  Cafe = 'CAFE'
}

@Component({
  selector: 'app-restaurant-editor',
  templateUrl: './restaurant-editor.component.html',
  styleUrls: ['./restaurant-editor.component.scss']
})
export class RestaurantEditorComponent implements OnInit {

  @Input() restaurantToEdit!: Restaurant;

  @Input() myRestaurants!: Restaurant[];

  selectedRestaurant!: Restaurant;

  selectedRestaurantType!: RestaurantCategory;

  types!: RestaurantCategory[];

  restaurantForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    address: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    mon: ['MON: ', [Validators.required]],
    tue: ['TUE: ', [Validators.required]],
    wed: ['WED: ', [Validators.required]],
    thu: ['THU: ', [Validators.required]],
    fri: ['FRI: ', [Validators.required]],
    sat: ['SAT: ', [Validators.required]],
    sun: ['SUN: ', [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private requestService: RequestService,
    private restaurantService: RestaurantService,
    private dialogRef: MatDialogRef<RequestEditorComponent>
  ) {
    this.types = Object.values(RestaurantCategory);
  }

  ngOnInit(): void {
    if (this.restaurantToEdit) {
      this.name.setValue(this.restaurantToEdit.name);
      this.description.setValue(this.restaurantToEdit.description);
      this.address.setValue(this.restaurantToEdit.address);
      this.phoneNumber.setValue(this.restaurantToEdit.phoneNumber);
      this.mon.setValue(this.restaurantToEdit.openingHours[0]);
      this.tue.setValue(this.restaurantToEdit.openingHours[1]);
      this.wed.setValue(this.restaurantToEdit.openingHours[2]);
      this.thu.setValue(this.restaurantToEdit.openingHours[3]);
      this.fri.setValue(this.restaurantToEdit.openingHours[4]);
      this.sat.setValue(this.restaurantToEdit.openingHours[5]);
      this.sun.setValue(this.restaurantToEdit.openingHours[6]);
      this.selectedRestaurantType = this.restaurantToEdit.category as RestaurantCategory;
    }
  }

  async submit() {
    if(!this.restaurantForm.valid) {
      return;
    }

    let tempId = 0;
    if (this.restaurantToEdit) {
      tempId = this.restaurantToEdit.id
    }

    const newRestaurant: Restaurant = {
      id: tempId,
      name: this.name.value,
      description: this.description.value,
      category: this.selectedRestaurantType,
      address: this.address.value,
      phoneNumber: this.phoneNumber.value,
      openingHours: [
        this.mon.value,
        this.tue.value,
        this.wed.value,
        this.thu.value,
        this.fri.value,
        this.sat.value,
        this.sun.value
      ],
    };

    if (this.restaurantToEdit && this.restaurantToEdit.id) {
      const updatedRestaurant = await this.restaurantService
        .editRestaurant(this.restaurantToEdit.id, newRestaurant);
    } else {
      const createdRestaurant = await this.restaurantService.createRestaurant(newRestaurant);
      if (createdRestaurant.id) {
        this.requestService.newRequestRestaurantId = createdRestaurant.id;
      }
    }
    await this.requestService.createRequest();
    this.dialogRef.close();
    window.location.reload();
  }

  resetRestaurantForm() {
    this.restaurantForm.reset();
  }

  get mon(): FormControl {
    return this.restaurantForm.get('mon') as FormControl;
  }
  get tue(): FormControl {
    return this.restaurantForm.get('tue') as FormControl;
  }
  get wed(): FormControl {
    return this.restaurantForm.get('wed') as FormControl;
  }
  get thu(): FormControl {
    return this.restaurantForm.get('thu') as FormControl;
  }
  get fri(): FormControl {
    return this.restaurantForm.get('fri') as FormControl;
  }
  get sat(): FormControl {
    return this.restaurantForm.get('sat') as FormControl;
  }
  get sun(): FormControl {
    return this.restaurantForm.get('sun') as FormControl;
  }
  get name(): FormControl {
    return this.restaurantForm.get('name') as FormControl;
  }
  get description(): FormControl {
    return this.restaurantForm.get('description') as FormControl;
  }
  get address(): FormControl {
    return this.restaurantForm.get('address') as FormControl;
  }
  get phoneNumber(): FormControl {
    return this.restaurantForm.get('phoneNumber') as FormControl;
  }
}
