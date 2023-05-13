import { pushMessageToServiceBus, EmailingMessage } from 'dls-messagelibrary';

import { IEmail } from './entities/email.interface';

export class EmailService implements IEmail {
  sendEmail = async (): Promise<void> => {
    const messageBody: EmailingMessage = {
      body: {
        recipientEmail: 'pstepien@interia.pl',
        orderId: '12312',
        purchasedItems: [{ name: 'Cap', quantity: 1, price: 10 }],
        totalPrice: 120,
        timestamp: 1,
      },
    };

    const MESSAGE_BUS = process.env.MESSAGE_BUS;
    console.log(MESSAGE_BUS);

    await pushMessageToServiceBus(
      process.env.MESSAGE_BUS,
      'emailing',
      messageBody
    );
  };
}
