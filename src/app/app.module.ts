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

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ViewGroupComponent } from './Pages/view-group/view-group.component';
@NgModule({
  declarations: [
    AppComponent,
    AddGroupComponent,
    AddExpensesComponent,
    ViewBalanceComponent,
    SettleUpComponent,
    ErrorMessageComponent,
    ViewGroupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
