import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressesEditorComponent } from './addresses-editor/addresses-editor.component';
import { AddressesListComponent } from './addresses-list/addresses-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantOffersComponent } from './restaurant-offers/restaurant-offers.component';

const routes: Routes = [{
  path: 'restaurant-list',
  component: RestaurantListComponent,
}, {
  path: 'restaurant-details',
  component: RestaurantDetailsComponent,
}, {
  path: 'restaurant-offers',
  component: RestaurantOffersComponent,
}, {
  path: 'orders',
  component: OrderListComponent,
}, {
  path: 'addresses-list',
  component: AddressesListComponent,
}, {
  path: 'addresses-editor',
  component: AddressesEditorComponent,
}, {
  path: 'profile',
  component: ProfileEditorComponent,
}, {
  path: '**',
  redirectTo: 'restaurant-list',
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
