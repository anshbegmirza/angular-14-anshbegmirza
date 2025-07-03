import { Component, OnInit } from '@angular/core';
import { ExpenseTrackService } from 'src/app/shared/expense-track.service';
import { Group } from '../add-group/group.model';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-settle-up',
  templateUrl: './settle-up.component.html',
  styleUrls: ['./settle-up.component.scss'],
})
export class SettleUpComponent implements OnInit {
  group: Group | undefined;
  members: User[] = [];
  netBalances: { [user: string]: number } = {};

  payer: string = '';
  payee: string = '';
  amount: number = 0;
  maxAmount: number = 0;
  message: string = '';
  showActionMessage: boolean = false;
  constructor(private expenseService: ExpenseTrackService) {}

  userId: number = 0;

  ngOnInit() {
    const groupArr = this.expenseService.showGroupDetails(
      this.expenseService.selectedGroup
    );
    if (groupArr.length) {
      this.group = groupArr[0];
      this.members = this.group.members;
      this.calculateNetBalances();
    }
  }

  calculateNetBalances() {
    const net: { [user: string]: number } = {};
    if (this.group && this.group.expense) {
      for (const exp of this.group.expense) {
        const paidBy = exp.paidBy;
        for (const split of exp.splits) {
          if (split.user.name === paidBy) continue;
          net[split.user.name] = (net[split.user.name] || 0) - split.amount;
          net[paidBy] = (net[paidBy] || 0) + split.amount;
        }
      }
    }
    this.netBalances = net;
  }

  onPayerChange() {
    this.payee = '';
    this.amount = 0;
    this.maxAmount = 0;
  }

  onPayeeChange() {
    if (this.payer && this.payee) {
      const owed = Math.min(
        Math.abs(this.netBalances[this.payer] || 0),
        Math.abs(this.netBalances[this.payee] || 0)
      );
      this.maxAmount = owed;
      this.amount = owed;
    }
  }

  settleUp() {
    if (!this.payer || !this.payee || this.amount <= 0) {
      this.message = 'Please select payer, payee, and a valid amount.';
      this.showActionMessage = true;
      setInterval(() => {
        this.showActionMessage = false;
      }, 1500);
      return;
    }
    if (this.amount > this.maxAmount) {
      this.message = 'Cannot settle more than owed amount.';
      this.showActionMessage = true;
      setInterval(() => {
        this.showActionMessage = false;
      }, 1500);
      return;
    }
    console.log(this.group);

    this.userId = this.getUserId(this.payee);

    if (this.group) {
      this.group.expense = this.group.expense || [];
      this.group.expense.push({
        paidBy: this.payer,
        splits: [
          { user: { id: this.userId, name: this.payee }, amount: this.amount },
        ],
        amount: this.amount,
        description: 'Settlement',
      });
      this.expenseService.saveToLocalStorage();
      this.calculateNetBalances();
      this.message = 'Settlement recorded!';
      this.payer = '';
      this.payee = '';
      this.amount = 0;
      this.maxAmount = 0;
    }
  }

  getUserId(userName: string) {
    const users = this.group?.members;
    console.log(users);
    let fetchedId: number = 0;
    users?.filter((e) => {
      if (e.name === userName) {
        fetchedId = e.id;
      }
    });
    return fetchedId;
  }

  onReset() {
    this.payee = '';
    this.payer = '';
    this.amount = 0;
  }
}
