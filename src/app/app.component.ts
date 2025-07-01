import { ExpenseTrackService } from './shared/expense-track.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Group } from './Pages/add-group/group.model';
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

  showChangeDialog = false;

  selectedGroup: string | null = null;

  changeGroupFrom!: FormGroup;
  groupDb: Group[] = [];
  showOptions = false;
  GroupExists = false;

  ngOnInit(): void {
    const currentUrl: string = window.location.href;

    this.groupDb = this.ExpenseTrackService.groupDb;
    if (this.groupDb.length !== 0 || this.groupDb.length > 1) {
      this.GroupExists = true;
    }
    console.log(this.groupDb);

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

    this.changeGroupFrom = new FormGroup({
      selectedGroup: new FormControl('', Validators.required),
    });
  }

  clearFirstLoadFlag() {
    sessionStorage.removeItem('firstLoad');
  }

  onReset() {
    this.ExpenseTrackService.resetLocalStorage();
    this.showDeleteDialog = !this.showDeleteDialog;
  }

  onChangeFormReset() {
    this.changeGroupFrom.reset();
    this.showChangeDialog = false;
  }

  onClear() {
    this.showDeleteDialog = !this.showDeleteDialog;
  }

  onClickShowChangeDialog() {
    this.showChangeDialog = !this.showChangeDialog;
  }

  onSubmit() {
    this.selectedGroup = this.changeGroupFrom.value.selectedGroup;
    console.log(this.selectedGroup);
    this.showChangeDialog = !this.showChangeDialog;
  }
}
