import { IUser } from './../../shared/interfaces/user.interface';
import { ICategory } from './../../shared/interfaces/category.interface';


export interface IThread {
  author?: IUser | string;
  category?: ICategory | string;
  title: string;
  content: string;
  bitcoinPrice?: number;
}
