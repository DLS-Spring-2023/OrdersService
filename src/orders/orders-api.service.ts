import { IDeductRequest } from './entities/deduct-request.entity';
import { IOrdersApi } from './entities/orders-api.interface';

export class OrdersApiService implements IOrdersApi {
  sendDeductRequest = async (deductRequest: IDeductRequest): Promise<any> => {
    try {
      const response = await fetch(process.env.PRODUCTS_SERVER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deductRequest),
      })
        .then((res) => res.json())
        .then((json) => json);

        return response;
    } catch (error) {
      console.log(error);
    }
  };
}
