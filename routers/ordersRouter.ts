import { Router } from 'express';

import { IOrderEntity } from '../db/orders/entities/orders.entity';

import { OrdersService } from '../db/orders/orders.service';

const router = Router();

const ordersService = new OrdersService();

router.get('/purchase-history', (req, res) => {
  const userId = 1;

  ordersService
    .getOrdersByClientId(userId)
    .then((orders) => {
      res.send(orders);
    })
    .catch((error) => {
      res.send(error.message);
    });
});

router.get('/create-order', (req, res) => {
  const newOrder: IOrderEntity = {
    customer_id: 1,
    order_date: new Date(),
    items_id: [1, 2, 3],
    total_price: 100,
  };

  ordersService
    .createOrder(newOrder)
    .then((order) => {
      res.send(order);
    })
    .catch((error) => {
      res.send(error.message);
    });
});

export default router;
