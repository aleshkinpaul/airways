import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCardComponent } from './pages/cards/shopping-card.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';

const routes: Routes = [
  { path: '', component: ShoppingCardComponent },
  { path: 'account-page', component: AccountPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingCardRoutingModule {}
