import { IDeductItems } from "./deduct-items.entity";

export interface IDeductRequest {
  requestId: string;
  deductItems: IDeductItems[]
}