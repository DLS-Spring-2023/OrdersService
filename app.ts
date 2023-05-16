import { config } from 'dotenv';
import express from 'express';

import OrdersRouter from './src/routers/ordersRouter';
import { connectToDB } from './src/db/connection/db-connection';
import { verifyTokenMiddleware } from './src/auth/verify-token-middleware';

config();

const app = express();

app.use(express.json());

// app.use(verifyTokenMiddleware);

app.use('/orders', OrdersRouter);

app.get('/', (req, res) => res.send('Testing azure'));

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
