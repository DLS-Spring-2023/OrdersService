import mongoose from 'mongoose';
import { IItemEntity } from './items.entity';

export interface IOrderEntity {
  customer_id: string;
  customer_email: string;
  order_date: Date;
  items: IItemEntity[];
  total_price: number;
}

export interface IOrderResponse extends mongoose.Document, IOrderEntity {
  _id: mongoose.Types.ObjectId;
}
