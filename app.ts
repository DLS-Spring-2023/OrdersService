import { config } from 'dotenv';
import express from 'express';

import OrdersRouter from './routers/ordersRouter';
import { connectToDB } from './db/connection/db-connection';

config();

const app = express();

app.use(express.json());

app.use('/orders', OrdersRouter);

app.get('/', (req, res) => res.send('Hello World'));

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
