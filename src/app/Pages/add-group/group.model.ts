import { User } from 'src/app/shared/user.model';

export interface Group {
  name: string;
  members: User[];
  expense?: any[];
}
