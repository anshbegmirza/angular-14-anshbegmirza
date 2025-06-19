import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AddGroupComponent } from './Pages/add-group/add-group.component';
import { AddExpensesComponent } from './Pages/add-expenses/add-expenses.component';
import { ViewBalanceComponent } from './Pages/view-balance/view-balance.component';
import { SettleUpComponent } from './Pages/settle-up/settle-up.component';
import { ErrorMessageComponent } from './Pages/error-message/error-message.component';

@NgModule({
  declarations: [
    AppComponent,
    AddGroupComponent,
    AddExpensesComponent,
    ViewBalanceComponent,
    SettleUpComponent,
    ErrorMessageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NoopAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
