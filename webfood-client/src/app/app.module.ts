import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { RestaurantListComponent } from './restaurants/restaurant-list/restaurant-list.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { AddressesListComponent } from './addresses/addresses-list/addresses-list.component';
import { AddressesEditorComponent } from './addresses/addresses-editor/addresses-editor.component';
import { RestaurantOffersComponent } from './restaurants/restaurant-offers/restaurant-offers.component';
import { RestaurantDetailsComponent } from './restaurants/restaurant-details/restaurant-details.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddressSummaryComponent } from './addresses/address-summary/address-summary.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MealListComponent } from './meals/meal-list/meal-list.component';
import { MealDetailsComponent } from './meals/meal-details/meal-details.component'
import { MatBadgeModule } from '@angular/material/badge';
import { HttpClientModule } from '@angular/common/http';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { MealSummaryComponent } from './meals/meal-summary/meal-summary.component';
import { CartComponent } from './cart/cart.component';
import { CartRestaurantWarnComponent } from './cart/cart-restaurant-warn/cart-restaurant-warn.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CartIconComponent } from './cart/cart-icon/cart-icon.component';
import { CartItemsComponent } from './cart/cart-items/cart-items.component';
import { CartAddressComponent } from './cart/cart-address/cart-address.component';
import { CartCommentComponent } from './cart/cart-comment/cart-comment.component';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,
    RestaurantListComponent,
    ProfileEditorComponent,
    AddressesListComponent,
    AddressesEditorComponent,
    RestaurantOffersComponent,
    RestaurantDetailsComponent,
    OrderListComponent,
    AddressSummaryComponent,
    MealListComponent,
    MealDetailsComponent,
    OrderDetailsComponent,
    MealSummaryComponent,
    CartComponent,
    CartRestaurantWarnComponent,
    CartIconComponent,
    CartItemsComponent,
    CartAddressComponent,
    CartCommentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatBadgeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatCardModule,
    MatDividerModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
