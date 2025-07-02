import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ExpenseTrackService } from 'src/app/shared/expense-track.service';
import { User } from 'src/app/shared/user.model';
import { Group } from '../add-group/group.model';

@Component({
  selector: 'app-add-expenses',
  templateUrl: './add-expenses.component.html',
  styleUrls: ['./add-expenses.component.scss'],
})
export class AddExpensesComponent implements OnInit {
  groupDb: Group[] = [];
  users: User[] = [];
  expenseForm!: FormGroup;
  selectedGroup: string = '';
  isGroupSelected = false;

  constructor(private expenseService: ExpenseTrackService) {}

  ngOnInit() {
    this.expenseService.loadFromLocalStorage();
    this.groupDb = this.expenseService.groupDb;
    this.expenseService.loadGroupNameFromLocalStorage();
    this.selectedGroup = this.expenseService.selectedGroup;

    this.setUsersForSelectedGroup();

    this.expenseForm = new FormGroup({
      paidBy: new FormControl('', Validators.required),
      amount: new FormControl('', [Validators.required, Validators.min(1)]),
      description: new FormControl('', Validators.required),
      splitType: new FormControl('even', Validators.required),
      splitBetween: new FormArray([]),
      customAmounts: new FormArray([]),
    });

    // console.log(this.users);

    this.resetUserFormArrays(this.users.length);
  }

  setUsersForSelectedGroup() {
    const groupArr = this.expenseService.showGroupDetails(this.selectedGroup);
    if (!groupArr.length) {
      this.users = [];
      return;
    }

    this.users = (groupArr[0].members as any[])
      .map((member: any) => {
        if (typeof member === 'string') {
          return this.expenseService.Users.find((u) => u.name === member);
        } else {
          return this.expenseService.Users.find((u) => u.id === member.id);
        }
      })
      .filter(Boolean) as User[];
  }

  resetUserFormArrays(userCount: number) {
    const splitBetween = this.expenseForm.get('splitBetween') as FormArray;
    const customAmounts = this.expenseForm.get('customAmounts') as FormArray;
    splitBetween.clear();
    customAmounts.clear();
    for (let i = 0; i < userCount; i++) {
      splitBetween.push(new FormControl(false));
      customAmounts.push(new FormControl({ value: '', disabled: true }));
    }
  }

  asFormControl(ctrl: any): FormControl {
    return ctrl as FormControl;
  }

  get splitBetweenArray() {
    return this.expenseForm.get('splitBetween') as FormArray;
  }
  get customAmountsArray() {
    return this.expenseForm.get('customAmounts') as FormArray;
  }

  onSplitTypeChange() {
    const isCustom = this.expenseForm.value.splitType === 'custom';
    this.customAmountsArray.controls.forEach((ctrl, i) => {
      if (isCustom && this.splitBetweenArray.at(i).value) {
        ctrl.enable();
      } else {
        ctrl.disable();
        ctrl.setValue('');
      }
    });
  }

  onSplitBetweenChange(i: number) {
    const isCustom = this.expenseForm.value.splitType === 'custom';
    if (isCustom) {
      if (this.splitBetweenArray.at(i).value) {
        this.customAmountsArray.at(i).enable();
      } else {
        this.customAmountsArray.at(i).disable();
        this.customAmountsArray.at(i).setValue('');
      }
    }
  }

  onSubmit() {
    const groupArr = this.expenseService.showGroupDetails(this.selectedGroup);
    if (!groupArr.length) return;
    const group = groupArr[0];

    const selectedUsers = this.splitBetweenArray.value
      .map((checked: boolean, i: number) => (checked ? this.users[i] : null))
      .filter((u: User | null) => u !== null);

    if (selectedUsers.length === 0) return;

    let splits;
    if (this.expenseForm.value.splitType === 'even') {
      const perUser = this.expenseForm.value.amount / selectedUsers.length;
      splits = selectedUsers.map((u: User) => ({ user: u, amount: perUser }));
    } else {
      splits = selectedUsers.map((u: User, i: number) => ({
        user: u,
        amount: this.customAmountsArray.at(i).value,
      }));
    }

    if (!group.expense) group.expense = [];
    group.expense.push({
      paidBy: this.expenseForm.value.paidBy,
      amount: this.expenseForm.value.amount,
      splitType: this.expenseForm.value.splitType,
      description: this.expenseForm.value.description,
      splits,
    });

    this.expenseService.saveToLocalStorage();
    this.onReset();
  }

  onReset() {
    this.expenseForm.reset();
    this.resetUserFormArrays(this.users.length);
  }
}
