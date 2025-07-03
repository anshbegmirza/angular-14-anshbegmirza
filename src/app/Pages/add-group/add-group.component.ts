import { ExpenseTrackService } from 'src/app/shared/expense-track.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user.model';
import { Group } from './group.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss'],
})
export class AddGroupComponent implements OnInit {
  constructor(private ExpenseTrackService: ExpenseTrackService) {}

  users: User[] = [];

  addGroupForm!: FormGroup;

  userName: any[] = [];

  GroupFormed: Group[] = [];
  count: number = 0;
  showActionMessage = false;
  errorMessage: string = '';
  ngOnInit(): void {
    this.users = this.ExpenseTrackService.Users;
    // console.log(this.users);

    this.users.forEach((user) => {
      this.userName.push(user.name);
    });
    // console.log(this.userName);

    this.addGroupForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      members: new FormArray(this.users.map(() => new FormControl(false))),
    });

    this.getMembersFromFormArray();
  }

  getMembersFromFormArray() {
    // console.log(this.addGroupForm.get('members'));

    return this.addGroupForm.get('members');
  }

  onSubmit() {
    const groupName = this.addGroupForm.value.name;

    const selectedMembers: User[] = this.addGroupForm.value.members
      .map((checked: boolean, i: number) => (checked ? this.users[i] : null))
      .filter((user: User | null) => user !== null)
      .map((user: User) => ({
        ...user,
      }));

    this.GroupFormed.push({ name: groupName, members: selectedMembers });
    console.log(this.GroupFormed);

    this.ExpenseTrackService.addNewGroup(this.GroupFormed);
    this.GroupFormed = [];
    this.showActionMessage = true;
    this.errorMessage = `Group Added Successfully !`;
    this.addGroupForm.reset();
    this.ExpenseTrackService.saveToLocalStorage();

    setInterval(() => {
      this.showActionMessage = false;
    }, 1500);
  }

  onReset() {
    this.showActionMessage = true;
    this.addGroupForm.reset();
    this.errorMessage = `Form Reset !`;
    setInterval(() => {
      this.showActionMessage = false;
    }, 2500);
  }
}
