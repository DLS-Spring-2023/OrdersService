import { IDeductRequest } from './entities/deduct-request.entity';
import { IOrdersApi } from './entities/orders-api.interface';

export class OrdersApiService implements IOrdersApi {
  //TODO: Implement api logic to send deduct request and receive response
  sendDeductRequest(deductRequest: IDeductRequest): Promise<any> {
    throw new Error('Method not implemented.');
  }

}


