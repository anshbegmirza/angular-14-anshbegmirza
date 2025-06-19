import { User } from 'src/app/shared/user.model';

export interface Group {
  name: string;
  member: User[];
}
