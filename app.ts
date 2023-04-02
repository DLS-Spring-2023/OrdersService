import { config } from 'dotenv';
import * as express from 'express';

import OrdersRouter from './routers/ordersRouter';
import { connectToDB } from './db/connection/db-connection';

config();

const app = express();
app.use(express.json());

app.use('/orders', OrdersRouter);

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
