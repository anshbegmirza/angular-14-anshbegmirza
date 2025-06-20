import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user.model';
import { ExpenseTrackService } from 'src/app/shared/expense-track.service';
@Component({
  selector: 'app-add-expenses',
  templateUrl: './add-expenses.component.html',
  styleUrls: ['./add-expenses.component.scss'],
})
export class AddExpensesComponent implements OnInit {
  users: User[] = [];

  constructor(private ExpenseTrackService: ExpenseTrackService) {}

  ngOnInit(): void {
    this.users = this.ExpenseTrackService.Users;
  }
}
