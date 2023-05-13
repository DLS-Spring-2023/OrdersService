import { pushMessageToServiceBus, EmailingMessage } from 'dls-messagelibrary';

import { IEmail } from './entities/email.interface';
import { IItemEntity } from '../orders/entities/items.entity';

export class EmailService implements IEmail {
  sendEmail = async (
    customerEmail: string,
    orderId: string,
    purchasedItems: IItemEntity[],
    totalPrice: number
  ): Promise<void> => {
    const messageBody: EmailingMessage = {
      body: {
        recipientEmail: customerEmail,
        orderId: orderId,
        purchasedItems: purchasedItems,
        totalPrice: totalPrice,
        timestamp: Date.now(),
      },
    };

    const CONNECTION_STRING = process.env.CONNECTION_STRING;

    if (CONNECTION_STRING) {
      await pushMessageToServiceBus(CONNECTION_STRING, 'emailing', messageBody);
    }
  };
}
