import { Router } from 'express';

import { IOrderEntity } from '../db/orders/entities/orders.entity';

import { OrdersService } from '../db/orders/orders.service';

const router = Router();

const ordersService = new OrdersService();

router.get('/purchase-history/:customerId', (req, res) => {
  const customerId = parseInt(req.params.customerId);

  ordersService
    .getOrdersByClientId(customerId)
    .then((orders) => {
      res.send(orders);
    })
    .catch((error) => {
      res.send(error.message);
    });
});

router.get('/create-order', (req, res) => {
  const newOrder: IOrderEntity = {
    customer_id: req.body.customerId,
    order_date: new Date(),
    items_id: req.body.itemsId,
    total_price: req.body.totalPrice,
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
