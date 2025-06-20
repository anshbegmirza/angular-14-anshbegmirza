import { ExpenseTrackService } from './shared/expense-track.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'SplitWise : anshbegmirza';

  year = new Date().getFullYear();

  routes: any[] = [];

  constructor(private ExpenseTrackService: ExpenseTrackService) {}

  showDeleteDialog: boolean = false;

  ngOnInit(): void {
    this.routes = [
      {
        path: '/addGroup',
        name: 'Add Group',
        icon: 'bi bi-person-plus-fill',
      },
      {
        path: '/addExpenses',
        name: 'Add Expenses',
        icon: 'bi bi-cash-coin',
      },
      {
        path: '/viewBalance',
        name: 'View Balance',
        icon: 'bi bi-bank',
      },
      {
        path: '/settleUp',
        name: 'Settle Up',
        icon: 'bi bi-coin',
      },
    ];
    // console.log(this.routes);
  }

  onReset() {
    this.ExpenseTrackService.resetLocalStorage();
    this.showDeleteDialog = !this.showDeleteDialog;
  }

  onClear() {
    this.showDeleteDialog = !this.showDeleteDialog;
  }
}
