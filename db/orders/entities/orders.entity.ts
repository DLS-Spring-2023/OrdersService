export interface IOrderEntity {
  customer_id: number;
  order_date: Date;
  items_id: number[];
  total_price: number;
}
