import { ExpenseTrackService } from './../../shared/expense-track.service';
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

  changeDectected = false;

  ngOnInit(): void {
    this.users = this.ExpenseTrackService.Users;
    // console.log(this.users);

    this.users.forEach((user) => {
      this.userName.push(user.name);
    });
    console.log(this.userName);

    this.addGroupForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      members: new FormArray(this.users.map(() => new FormControl(false))),
    });

    this.getMembersFromFormArray();
  }

  getMembersFromFormArray() {
    console.log(this.addGroupForm.get('members'));

    return this.addGroupForm.get('members');
  }

  onSubmit() {
    const groupName = this.addGroupForm.value.name;

    const selectedMembers = this.addGroupForm.value.members
      .map((checked: boolean, i: number) =>
        checked ? this.users[i].name : null
      )
      .filter((name: string | null) => name !== null);

    // console.log('Group Name:', this.addGroupForm.value.name);
    // console.log('Selected Members:', selectedMembers);

    this.GroupFormed.push({ name: groupName, members: selectedMembers });

    // console.log(this.GroupFormed);

    this.ExpenseTrackService.addNewGroup(this.GroupFormed);
    this.GroupFormed = [];
    this.changeDectected = true;
    this.addGroupForm.reset();
    this.ExpenseTrackService.saveToLocalStorage();
  }

  onReset() {
    this.changeDectected = true;
    this.addGroupForm.reset();
  }
}
