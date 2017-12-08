import { IUser } from './../../shared/interfaces/user.interface';
import { IThread } from './../../shared/interfaces/thread.interface';


export interface IVote {
  user: IUser | string;
  thread: IThread | string;
}
