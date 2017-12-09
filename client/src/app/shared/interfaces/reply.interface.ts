import { IUser } from './../../shared/interfaces/user.interface';
import { IThread } from './../../shared/interfaces/thread.interface';


export interface IReply {
  author?: IUser | string;
  thread?: IThread | string;
  content: string;
}
