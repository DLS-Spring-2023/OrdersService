import { Router, Request, Response } from 'express';

import { IOrderEntity } from '../orders/entities/orders.entity';

import { OrdersService } from '../orders/orders.service';

import { EmailService } from '../email/email.service';
import { IItemEntity } from '../orders/entities/items.entity';

interface CustomRequest extends Request {
  sub?: string;
}

const router = Router();

const ordersService = new OrdersService();

const emailService = new EmailService();

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
      items: req.body.items,
      total_price: req.body.totalPrice,
    };
    // const testItems: IItemEntity[] = [
    //   { productId: 1, name: 'Item 1', quantity: 10, price: 20 },
    //   { productId: 2, name: 'Item 2', quantity: 5, price: 15 },
    //   { productId: 3, name: 'Item 3', quantity: 8, price: 25 },
    // ];
    // const testOrder: IOrderEntity = {
    //   customer_id: "test",
    //   customer_email: "test",
    //   order_date: new Date(),
    //   items: testItems,
    //   total_price: 60,
    // };

    // ordersService.sendDeductRequest(newOrder.items).then((response) => {
    //   console.log(response);
    //   res.send(response).status(200);
    // });
    
    console.log(newOrder);
    ordersService
      .createOrder(newOrder)
      .then((order) => {
        const orderId = order._id.toString();
        emailService
          .sendEmail(
            order.customer_email,
            orderId,
            order.items,
            order.total_price
          )
          .then(() => {
            res.send(order).status(200);
          });
      })
      .catch((error) => {
        res.send(error.message).status(400);
      });
  } else {
    res.send('No customer id found').status(400);
  }
});

export default router;
