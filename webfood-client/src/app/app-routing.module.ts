import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressesEditorComponent } from './addresses/addresses-editor/addresses-editor.component';
import { AddressesListComponent } from './addresses/addresses-list/addresses-list.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
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
  path: 'login',
  component: LoginComponent
}, {
  path: '**',
  redirectTo: 'restaurants',
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
