import { ExpenseTrackService } from 'src/app/shared/expense-track.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { User } from 'src/app/shared/user.model';
import { Group } from '../add-group/group.model';
@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.scss'],
})
export class ViewGroupComponent implements OnInit {
  routes: any[] = [];

  constructor(private expenseTrackService: ExpenseTrackService) {}
  users: User[] = [];
  viewGroupForm!: FormGroup;
  groupDb: Group[] = [];
  selectedGroup: string = '';

  showOptions = false;
  members: any[] = [];

  ngOnInit(): void {
    this.routes = [
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

    this.groupDb = this.expenseTrackService.groupDb;

    this.viewGroupForm = new FormGroup({
      selectedGroup: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.selectedGroup = this.viewGroupForm.value.selectedGroup;
    this.expenseTrackService.selectedGroup = this.selectedGroup;
    console.log('name in service', this.expenseTrackService.selectedGroup);
    this.showOptions = true;

    this.groupDb.filter((gc) => {
      if (gc.name === this.selectedGroup) {
        this.members = gc.members;
      }
    });

    this.viewGroupForm.reset();
  }

  onReset() {
    this.viewGroupForm.reset();
  }
}
