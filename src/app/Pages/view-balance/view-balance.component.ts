import { Group } from './../add-group/group.model';
import { Component, OnInit } from '@angular/core';
import { ExpenseTrackService } from 'src/app/shared/expense-track.service';
import { balance } from './balance.model';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-view-balance',
  templateUrl: './view-balance.component.html',
  styleUrls: ['./view-balance.component.scss'],
})
export class ViewBalanceComponent implements OnInit {
  constructor(private expenseTrackService: ExpenseTrackService) {}

  b: balance[] = [];
  selectedGroup: Group[] = [];
  // viewForm: FormGroup;

  ngOnInit(): void {
    console.log(this.expenseTrackService.groupDb);

    // this.viewForm = new FormGroup({
    //   selectedGroup: new FormControl('', Validators.required),
    // });
  }
}
