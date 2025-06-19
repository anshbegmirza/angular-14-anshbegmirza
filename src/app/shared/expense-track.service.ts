import { Group } from './../Pages/add-group/group.model';
import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseTrackService {
  constructor() {}

  Users: User[] = [
    {
      id: 1,
      name: 'Alice',
    },
    {
      id: 2,
      name: 'Bob',
    },
    {
      id: 3,
      name: 'Charlie',
    },
  ];

  group: Group[] = [];

  addNewGroup(g: Group) {
    this.group.push(g);
  }
}
