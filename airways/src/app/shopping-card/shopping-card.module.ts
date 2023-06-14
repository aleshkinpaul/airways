import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCardRoutingModule } from './shopping-card-routing.module';
import { ShoppingCardComponent } from './pages/cards/shopping-card.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SortButtonComponent } from './components/sort-button/sort-button.component';
import { OrderComponent } from './components/order/order.component';
import { MatMenuModule } from '@angular/material/menu';
import { CardMenuComponent } from './components/order/card-menu/card-menu.component';
import { SharedModule } from '@shared/shared.module';
import { SortOrdersPipe } from './pipes/sort-orders.pipe';
import { AccountPageComponent } from './pages/account-page/account-page.component';

@NgModule({
  declarations: [
    ShoppingCardComponent,
    AccountPageComponent,
    SortButtonComponent,
    OrderComponent,
    CardMenuComponent,
    SortOrdersPipe,
  ],
  imports: [
    CommonModule,
    ShoppingCardRoutingModule,
    MatCheckboxModule,
    MatMenuModule,
    SharedModule,
  ],
})
export class ShoppingCardModule {}
