import { User } from 'src/app/shared/user.model';

export interface Group {
  name: string;
  members: User[];
  expense?: {
    paidBy: string;
    amount: number;
    description: string;
    splitType: string;
    splits: { user: User; amount: number }[];
  }[];
}
