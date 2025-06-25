import { ExpenseTrackService } from './shared/expense-track.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'SplitWise : anshbegmirza';

  year = new Date().getFullYear();

  routes: any[] = [];

  isLinkGroup = false;

  constructor(
    private ExpenseTrackService: ExpenseTrackService,
    private router: Router
  ) {}

  showDeleteDialog: boolean = false;

  showGroupOptions = false;

  ngOnInit(): void {
    const currentUrl: string = window.location.href;
    this.routes = [
      {
        path: '/addGroup',
        name: 'Add Group',
        icon: 'bi bi-person-plus-fill',
      },
      {
        path: '/viewGroup',
        name: 'View Group',
        icon: 'bi bi-backpack',
      },
    ];

    console.log(currentUrl);
    if (this.ExpenseTrackService.selectedGroup) {
      console.log(this.ExpenseTrackService.selectedGroup);
    }

    if (!sessionStorage.getItem('firstLoad')) {
      sessionStorage.setItem('firstLoad', 'true');

      console.log(
        'Application loaded for the first time or after a full refresh.'
      );
    } else {
      console.log('Application reloaded (likely a refresh).');
    }
  }

  clearFirstLoadFlag() {
    sessionStorage.removeItem('firstLoad');
  }

  onReset() {
    this.ExpenseTrackService.resetLocalStorage();
    this.showDeleteDialog = !this.showDeleteDialog;
  }

  onClear() {
    this.showDeleteDialog = !this.showDeleteDialog;
  }
}
