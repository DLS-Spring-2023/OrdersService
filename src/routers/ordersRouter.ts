import { Router, Request, Response } from 'express';

import { IOrderEntity } from '../db/orders/entities/orders.entity';

import { OrdersService } from '../db/orders/orders.service';

interface CustomRequest extends Request {
  sub?: string;
}

const router = Router();

const ordersService = new OrdersService();

router.get('/purchase-history', (req: CustomRequest, res: Response) => {
  const customerId = req.sub;
  if (req.sub) {
    ordersService
      .getOrdersByClientId(customerId)
      .then((orders) => {
        res.send(orders).status(200);
      })
      .catch((error) => {
        res.send(error.message).status(400);
      });
  } else {
    res.send('No customer id found').status(400);
  }
});

router.post('/create-order', (req: CustomRequest, res: Response) => {
  if (req.sub) {
    const newOrder: IOrderEntity = {
      customer_id: req.sub,
      customer_email: req.body.customerEmail,
      order_date: new Date(),
      items_id: req.body.itemsId,
      total_price: req.body.totalPrice,
    };

    console.log(newOrder);

    ordersService
      .createOrder(newOrder)
      .then((order) => {
        res.send(order).status(200);
      })
      .catch((error) => {
        res.send(error.message).status(400);
      });
  } else {
    res.send('No customer id found').status(400);
  }
});

export default router;
