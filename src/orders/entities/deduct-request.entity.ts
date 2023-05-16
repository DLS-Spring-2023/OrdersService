import { IDeductItems } from "./deduct-item.entity";

export interface IDeductRequest {
  requestId: string;
  deductItems: IDeductItems[]
}