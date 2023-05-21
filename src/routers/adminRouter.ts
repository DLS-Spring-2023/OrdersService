import { Router, Request, Response } from 'express';

import { OrdersService } from '../orders/orders.service';

import { verifyAdminTokenMiddleware } from '../auth/verify-token-middleware';

interface CustomRequest extends Request {
  sub?: string;
}

const adminRouter = Router();

const ordersService = new OrdersService();

adminRouter.use(verifyAdminTokenMiddleware);

adminRouter.get('/orders', (req: CustomRequest, res: Response) => {
  ordersService
    .getOrders()
    .then((orders) => {
      res.send(orders).status(200);
    })
    .catch((error) => {
      res.send(error.message).status(400);
    });
});

export default adminRouter;
