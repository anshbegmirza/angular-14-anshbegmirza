import { Group } from '../Pages/add-group/group.model';
import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseTrackService {
  constructor() {
    this.loadFromLocalStorage();
  }

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

  groupDb: Group[] = [];

  selectedGroup: string = '';

  addNewGroup(g: Group[]) {
    g.forEach((el) => {
      this.groupDb.push(el);
    });

    console.log(this.groupDb);
  }

  loadFromLocalStorage() {
    let saved = localStorage.getItem('groupDb');

    if (saved) {
      this.groupDb = JSON.parse(saved);
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('groupDb', JSON.stringify(this.groupDb));
  }

  resetLocalStorage() {
    this.groupDb = [];
    this.saveToLocalStorage();
  }

  saveGroupNameToLocalStorage(selectedGroupName: string) {
    localStorage.setItem('groupName', JSON.stringify(selectedGroupName));
  }

  loadGroupNameFromLocalStorage() {
    let saved = localStorage.getItem('groupName');

    if (saved) {
      this.selectedGroup = JSON.parse(saved);
    } else this.selectedGroup = '';
  }

  deleteGroupNameToLocalStorage() {
    localStorage.removeItem('groupName');
  }

  showGroupDetails(groupName: string): Group[] {
    // console.log(this.groupDb);

    const foundGrp = this.groupDb.filter((group) => group.name === groupName);

    console.log('Group Found with name in service', foundGrp);
    return foundGrp;
  }
}
