import { Component, OnInit } from '@angular/core';
import { ExpenseTrackService } from 'src/app/shared/expense-track.service';
import { User } from 'src/app/shared/user.model';
import { Group } from '../add-group/group.model';
import { Balance } from './balance.model';

@Component({
  selector: 'app-view-balance',
  templateUrl: './view-balance.component.html',
  styleUrls: ['./view-balance.component.scss'],
})
export class ViewBalanceComponent implements OnInit {
  groupDb: Group[] = [];
  balances: Balance[] = [];
  netBalances: { [user: string]: number } = {};
  users: User[] = [];
  constructor(private expenseService: ExpenseTrackService) {}

  ngOnInit() {
    this.groupDb = this.expenseService.groupDb;
    this.calculateBalances();
  }

  calculateBalances() {
    const balanceMap: { [key: string]: { [key: string]: number } } = {};
    const net: { [user: string]: number } = {};

    for (const group of this.groupDb) {
      if (!group.expense) continue;
      for (const exp of group.expense) {
        const paidBy = exp.paidBy;
        for (const split of exp.splits) {
          if (split.user.name === paidBy) continue; // skip payer
          // Record who owes whom
          if (!balanceMap[split.user.name]) balanceMap[split.user.name] = {};
          if (!balanceMap[split.user.name][paidBy])
            balanceMap[split.user.name][paidBy] = 0;
          balanceMap[split.user.name][paidBy] += split.amount;

          // Net balance
          net[split.user.name] = (net[split.user.name] || 0) - split.amount;
          net[paidBy] = (net[paidBy] || 0) + split.amount;
        }
      }
    }

    // Flatten to array for display
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
