import { IDeductRequest } from './entities/deduct-request.entity';
import { IItemEntity } from './entities/items.entity';
import { IOrderEntity, IOrderResponse } from './entities/orders.entity';
import { IOrders } from './entities/orders.interface';
import Order from './entities/orders.schema';
import { v4 as uuidv4 } from 'uuid';

import { extractProductIdsAndCreateDeductItems } from './utils/extractProductIdsAndCreateDeductItems';
import { OrdersApiService } from './orders-api.service'
export class OrdersService implements IOrders {
  ordersApiService: OrdersApiService = new OrdersApiService();

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

  sendDeductRequest = async (items: IItemEntity[]): Promise<any> => {
    const deductItems = extractProductIdsAndCreateDeductItems(items);
    const deductRequest: IDeductRequest = {
      deductItems,
      requestId: uuidv4(),
    };

    return this.ordersApiService.sendDeductRequest(deductRequest);
  }
}
