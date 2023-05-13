import { IOrderEntity } from './entities/orders.entity';
import { IOrders } from './entities/orders.interface';
import Order from './entities/orders.schema';

export class OrdersService implements IOrders {
  createOrder = async (order: IOrderEntity): Promise<IOrderEntity> => {
    try {
      const createdOrder: IOrderEntity = await Order.create(order);
      return createdOrder;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getOrdersByClientId = async (clientId: string): Promise<IOrderEntity[]> => {
    try {
      const orders: IOrderEntity[] = await Order.find({
        customer_id: clientId,
      });
      return orders;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
