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
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { AddressesListComponent } from './addresses-list/addresses-list.component';
import { AddressesEditorComponent } from './addresses-editor/addresses-editor.component';
import { RestaurantOffersComponent } from './restaurant-offers/restaurant-offers.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { OrderListComponent } from './order-list/order-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    RestaurantListComponent,
    ProfileEditorComponent,
    AddressesListComponent,
    AddressesEditorComponent,
    RestaurantOffersComponent,
    RestaurantDetailsComponent,
    OrderListComponent
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
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
