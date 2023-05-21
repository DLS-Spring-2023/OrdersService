import { config } from 'dotenv';
import express from 'express';

import OrdersRouter from './src/routers/ordersRouter';
import { connectToDB } from './src/db/connection/db-connection';
import { verifyUserTokenMiddleware } from './src/auth/verify-token-middleware';
import adminRouter from './src/routers/adminRouter';

config();

const app = express();

app.use(express.json());

app.use('/v1/orders', OrdersRouter);

app.use('/v1/admin', adminRouter);

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
