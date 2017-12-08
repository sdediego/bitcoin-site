import { IUser } from './../../shared/interfaces/user.interface';
import { ICategory } from './../../shared/interfaces/category.interface';


export interface IThread {
  author: IUser;
  category: ICategory;
  title: string;
  content: string;
  bitcoinPrice?: number;
}
