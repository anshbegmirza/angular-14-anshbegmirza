import { Component, OnInit } from '@angular/core';
import { ExpenseTrackService } from 'src/app/shared/expense-track.service';
import { User } from 'src/app/shared/user.model';
import { Group } from '../add-group/group.model';

@Component({
  selector: 'app-view-balance',
  templateUrl: './view-balance.component.html',
  styleUrls: ['./view-balance.component.scss'],
})
export class ViewBalanceComponent implements OnInit {
  group: Group | undefined;
  expenses: any[] = [];
  balances: any[] = [];
  netBalances: { [user: string]: number } = {};
  users: any[] = [];

  constructor(private expenseService: ExpenseTrackService) {}

  ngOnInit() {
    this.expenseService.loadGroupNameFromLocalStorage();
    const groupArr = this.expenseService.showGroupDetails(
      this.expenseService.selectedGroup
    );

    // console.log('here is view balance component !!!', this.expenses);

    console.log(groupArr);
    if (groupArr.length) {
      this.group = groupArr[0];
      this.expenses = this.group.expense || [];
      this.users = this.group.members;
    }
    this.calculateBalances();
  }

  calculateBalances() {
    const balanceMap: { [key: string]: { [key: string]: number } } = {};
    const net: { [user: string]: number } = {};

    if (this.group && this.group.expense) {
      for (const exp of this.group.expense) {
        const paidBy = exp.paidBy;
        for (const split of exp.splits) {
          if (split.user.name === paidBy) continue;

          if (!balanceMap[split.user.name]) balanceMap[split.user.name] = {};
          if (!balanceMap[split.user.name][paidBy])
            balanceMap[split.user.name][paidBy] = 0;
          balanceMap[split.user.name][paidBy] += split.amount;

          net[split.user.name] = (net[split.user.name] || 0) - split.amount;
          net[paidBy] = (net[paidBy] || 0) + split.amount;
        }
      }
    }

    this.balances = [];
    for (const from in balanceMap) {
      for (const to in balanceMap[from]) {
        if (balanceMap[from][to] > 0) {
          this.balances.push({ from, to, amount: balanceMap[from][to] });
        }
      }
    }
    this.netBalances = net;
  }
}
