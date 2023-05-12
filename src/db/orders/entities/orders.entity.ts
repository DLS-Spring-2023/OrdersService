export interface IOrderEntity {
  customer_id: string;
  customer_email: string;
  order_date: Date;
  items_id: number[];
  total_price: number;
}
