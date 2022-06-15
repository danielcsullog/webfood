import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressesEditorComponent } from './addresses/addresses-editor/addresses-editor.component';
import { AddressesListComponent } from './addresses/addresses-list/addresses-list.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { RestaurantDetailsComponent } from './restaurants/restaurant-details/restaurant-details.component';
import { RestaurantListComponent } from './restaurants/restaurant-list/restaurant-list.component';
import { RestaurantOffersComponent } from './restaurants/restaurant-offers/restaurant-offers.component';

const routes: Routes = [{
  path: 'restaurants',
  component: RestaurantListComponent,
}, {
  path: 'restaurant-details',
  component: RestaurantDetailsComponent,
}, {
  path: 'restaurants/:restaurantId',
  component: RestaurantOffersComponent,
}, {
  path: 'orders',
  component: OrderListComponent,
}, {
  path: 'addresses',
  component: AddressesListComponent,
}, {
  path: 'addresses/new',
  component: AddressesEditorComponent,
}, {
  path: 'profile/:userId',
  component: ProfileEditorComponent,
}, {
  path: '**',
  redirectTo: 'restaurants',
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
