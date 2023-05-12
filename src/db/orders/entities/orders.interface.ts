import { IOrderEntity } from './orders.entity';

export interface IOrders {
  createOrder(order: IOrderEntity): Promise<IOrderEntity>;

  getOrdersByClientId(clientId: string): Promise<IOrderEntity[]>;
}
