import { IDeductRequest } from './deduct-request.entity';

export interface IOrdersApi {
  sendDeductRequest(deductRequest: IDeductRequest): Promise<any>
}
