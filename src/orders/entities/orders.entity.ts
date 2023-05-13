import { IItemEntity } from './items.entity';

export interface IOrderEntity {
  customer_id: string;
  customer_email: string;
  order_date: Date;
  items: IItemEntity[];
  total_price: number;
}
