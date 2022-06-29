import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressesEditorComponent } from './addresses/addresses-editor/addresses-editor.component';
import { AddressesListComponent } from './addresses/addresses-list/addresses-list.component';
import { AuthGuard } from './auth/auth.guard';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { MyRestaurantLandingComponent } from './my-restaurant/my-restaurant-landing/my-restaurant-landing.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { RegistrationComponent } from './registration/registration.component';
import { RestaurantDetailsComponent } from './restaurants/restaurant-details/restaurant-details.component';
import { RestaurantListComponent } from './restaurants/restaurant-list/restaurant-list.component';
import { RestaurantOffersComponent } from './restaurants/restaurant-offers/restaurant-offers.component';

const routes: Routes = [{
  path: 'restaurants',
  component: RestaurantListComponent,
  canActivate: [AuthGuard],
}, {
  path: 'restaurant-details',
  component: RestaurantDetailsComponent,
  canActivate: [AuthGuard],
}, {
  path: 'restaurants/:restaurantId',
  component: RestaurantOffersComponent,
  canActivate: [AuthGuard],
}, {
  path: 'orders',
  component: OrderListComponent,
  canActivate: [AuthGuard],
}, {
  path: 'addresses',
  component: AddressesListComponent,
  canActivate: [AuthGuard],
}, {
  path: 'addresses/new',
  component: AddressesEditorComponent,
  canActivate: [AuthGuard],
}, {
  path: 'profile/:userId',
  component: ProfileEditorComponent,
  canActivate: [AuthGuard],
}, {
  path: 'myrestaurant/landing',
  component: MyRestaurantLandingComponent
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'registration',
  component: RegistrationComponent
}, {
  path: 'landing',
  component: LandingComponent,
}, {
  path: '**',
  redirectTo: 'landing',
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
