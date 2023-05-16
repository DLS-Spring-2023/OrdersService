import mongoose from 'mongoose';
import { IItemEntity } from './items.entity';

export enum OrderStatus {
  FAILED = 'FAILED',
  OK = 'OK',
  INVALID_REQUEST = 'INVALID REQUEST'
}
export interface IOrderEntity {
  customer_id: string;
  customer_email: string;
  order_date: Date;
  items: IItemEntity[];
  total_price: number;
  status? : OrderStatus;
}

export interface IOrderResponse extends mongoose.Document, IOrderEntity {
  _id: mongoose.Types.ObjectId;
}
