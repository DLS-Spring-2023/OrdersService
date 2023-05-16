import { Router, Request, Response } from 'express';

import { IOrderEntity, OrderStatus } from '../orders/entities/orders.entity';

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

    ordersService.sendDeductRequest(newOrder.items).then((response) => {
      if (response.status === OrderStatus.OK) {
        const completedOrder = {
          ...newOrder,
          status: OrderStatus.OK,
        };

        ordersService
          .createOrder(completedOrder)
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
      } else if (response.status === OrderStatus.INVALID_REQUEST) {
        const invalidOrder = {
          ...newOrder,
          status: OrderStatus.INVALID_REQUEST,
        };
        ordersService.createOrder(invalidOrder);

        res.send('Invalid request').status(400);
      } else if (response.status === OrderStatus.FAILED) {
        const failedOrder = {
          ...newOrder,
          status: OrderStatus.INVALID_REQUEST,
        };
        ordersService.createOrder(failedOrder);

        res.send('Not enough stock').status(400);
      }
    });
  } else {
    res.send('No customer id found').status(400);
  }
});

export default router;
