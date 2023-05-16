import { IDeductRequest } from './entities/deduct-request.entity';
import { IOrdersApi } from './entities/orders-api.interface';

export class OrdersApiService implements IOrdersApi {
  sendDeductRequest = async (deductRequest: IDeductRequest): Promise<any> => {
    try {
      const response = await fetch('http://localhost:3001/products/deduct/update-stock', {
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
