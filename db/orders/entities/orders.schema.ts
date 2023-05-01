import mongoose, { Schema } from 'mongoose';

import { IOrderEntity } from './orders.entity';

const orderSchema: Schema = new mongoose.Schema(
  {
    customer_id: {
      type: Number,
      required: true,
    },
    customer_email: {
      type: String,
      required: true,
    },
    order_date: {
      type: Date,
      required: true,
    },
    items_id: {
      type: [Number],
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false }
);

export default mongoose.model<IOrderEntity>('Order', orderSchema);
