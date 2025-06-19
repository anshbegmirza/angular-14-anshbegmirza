import { ExpenseTrackService } from './../../shared/expense-track.service';
import { Component } from '@angular/core';
import { User } from 'src/app/shared/user.model';
import { Group } from './group.model';
@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss'],
})
export class AddGroupComponent {
  constructor(private ExpenseTrackService: ExpenseTrackService) {}

  onSubmit(g: Group) {
    this.ExpenseTrackService.addNewGroup(g);
  }
}
