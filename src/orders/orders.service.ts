import { IOrderEntity, IOrderResponse } from './entities/orders.entity';
import { IOrders } from './entities/orders.interface';
import Order from './entities/orders.schema';

export class OrdersService implements IOrders {
  createOrder = async (order: IOrderEntity): Promise<IOrderResponse> => {
    try {
      const createdOrder: IOrderResponse = await Order.create(order);
      return createdOrder;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getOrdersByClientId = async (clientId: string): Promise<IOrderResponse[]> => {
    try {
      const orders: IOrderResponse[] = await Order.find({
        customer_id: clientId,
      });
      return orders;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
