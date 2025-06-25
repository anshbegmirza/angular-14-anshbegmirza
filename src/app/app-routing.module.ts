import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import { AddGroupComponent } from './Pages/add-group/add-group.component';
import { AddExpensesComponent } from './Pages/add-expenses/add-expenses.component';
import { ViewBalanceComponent } from './Pages/view-balance/view-balance.component';
import { SettleUpComponent } from './Pages/settle-up/settle-up.component';
import { ErrorMessageComponent } from './Pages/error-message/error-message.component';
import { ViewGroupComponent } from './Pages/view-group/view-group.component';
const routes: Route[] = [
  {
    path: '',
    redirectTo: '/addGroup',
    pathMatch: 'full',
  },
  {
    path: 'addGroup',
    component: AddGroupComponent,
  },
  {
    path: 'viewGroup',
    component: ViewGroupComponent,
  },
  {
    path: 'addExpenses',
    component: AddExpensesComponent,
  },
  {
    path: 'viewBalance',
    component: ViewBalanceComponent,
  },
  {
    path: 'settleUp',
    component: SettleUpComponent,
  },
  {
    path: 'not-found',
    component: ErrorMessageComponent,
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
