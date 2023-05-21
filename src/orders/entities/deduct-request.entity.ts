import { IDeductItem } from './deduct-item.entity';

export interface IDeductRequest {
  requestId: string;
  deductItems: IDeductItem[];
}
