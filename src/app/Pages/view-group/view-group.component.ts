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
  // users: User[] = [];
  viewGroupForm!: FormGroup;
  groupDb: Group[] = [];
  selectedGroup: string = '';
  groupMembers: any[] = [];
  showOptions = true;
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

    if (this.groupDb.length === 1) {
      this.selectedGroup = this.groupDb[0].name;

      console.log(this.groupDb[0].name);

      // this.expenseTrackService.showGroupDetails(this.selectedGroup);
      this.groupMembers = this.expenseTrackService.showGroupDetails(
        this.selectedGroup
      );
      console.log(this.groupMembers);
      this.members = this.groupMembers[0].members;
      console.log(this.members);

      console.log('view group selected group', this.selectedGroup);
      this.expenseTrackService.saveGroupNameToLocalStorage(this.selectedGroup);
    }

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
